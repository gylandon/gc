import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { profile as API } from '@api';
import { logoutAction } from '@actions';
import { useDispatch } from 'react-redux';

export default function route({
  component: Component,
  isDashboard,
  isPrivate,
  isAdmin,
  isLogin,
  isProcessor,
  isDriver,
  isCustomer,
  ...rest
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function checkToken() {
      if (isPrivate) {
        const res = await API.fetchPro();
        if (res.status !== 200) {
          logoutAction(dispatch);
        }
      }
    })();
  }, [Component]);

  const userInfo = useSelector((state) => state.auth);

  if (isPrivate && !userInfo[0].signed) {
    return <Redirect to="/" />;
  }

  if (isLogin && userInfo[0].signed) {
    return <Redirect to="/dashboard" />;
  }

  if (isPrivate && isAdmin) {
    if (userInfo[0].data.role != null) {
      if (userInfo[0].data.role[0].roleName != 'ROLE_admin') {
        return <Redirect to="/403" />;
      }
    }
  }
  if (isPrivate && isCustomer) {
    if (userInfo[0].data.role != null) {
      if (userInfo[0].data.role[0].roleName != 'ROLE_customer') {
        return <Redirect to="/403" />;
      }
    }
  }
  if (isPrivate && isDriver) {
    if (userInfo[0].data.role != null) {
      if (
        userInfo[0].data.role[0].roleName != 'ROLE_driver' &&
        userInfo[0].data.role[0].roleName != 'ROLE_admin'
      ) {
        return <Redirect to="/403" />;
      }
    }
  }
  if (isPrivate && isProcessor) {
    if (userInfo[0].data.role != null) {
      if (
        userInfo[0].data.role[0].roleName != 'ROLE_processor' &&
        userInfo[0].data.role[0].roleName != 'ROLE_admin'
      ) {
        return <Redirect to="/403" />;
      }
    }
  }

  if (isPrivate && userInfo[0].signed && isDashboard) {
    if (userInfo[0].data.role != null) {
      if (userInfo[0].data.role[0].roleName == 'ROLE_customer') {
        return <Redirect to="/customer/dashboard" />;
      } else if (userInfo[0].data.role[0].roleName == 'ROLE_admin') {
        return <Redirect to="/admin/dashboard" />;
      } else if (userInfo[0].data.role[0].roleName == 'ROLE_processor') {
        return <Redirect to="/processor/dashboard" />;
      } else if (userInfo[0].data.role[0].roleName == 'ROLE_driver') {
        return <Redirect to="/driver/dashboard" />;
      }
    } else {
      return <Redirect to="/" />;
    }
  }

  return <Route {...rest} component={Component} />;
}
