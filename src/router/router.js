import React from 'react';
import { Switch } from 'react-router-dom';
import {
  LoginView,
  SignupView,
  ResetView,
  ForgotView,
  ForgotPendingView,
  AccountProfileView,
  VirtualizedList
} from '@user';
import {
  CustomerDashboardView,
  AdminDashboardView,
  StaffDashboardView,
  DriverDashboardView,
} from '@dashboard';
import { BookingView } from '@views/booking';
import { CollectionView } from '@views/collection';
import { AccountView } from '@views/accountManage';
import { ProcessingView } from '@views/processing';
import {
  notFound,
  tokenExpired,
  unauthorized,
  serverErr,
  success,
} from '@processPages';
import { ReportView, BusinessReport } from '@report';
import Route from './route';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" isPrivate isDashboard exact />

      <Route
        path="/customer/dashboard"
        isPrivate
        isCustomer
        exact
        component={CustomerDashboardView}
      />

      <Route
        path="/admin/dashboard"
        isPrivate
        exact
        isAdmin
        component={AdminDashboardView}
      />

      <Route
        path="/admin/report"
        exact
        isAdmin
        isPrivate
        component={BusinessReport}
      />

      <Route
        path="/driver/processing"
        isDriver
        isPrivate
        exact
        component={CollectionView}
      />

      <Route
        path="/processor/dashboard"
        isPrivate
        isProcessor
        exact
        component={StaffDashboardView}
      />

      <Route
        path="/driver/dashboard"
        isPrivate
        isDriver
        exact
        component={DriverDashboardView}
      />

      <Route
        path="/admin/profile"
        isPrivate
        exact
        isAdmin
        component={AccountProfileView}
      />
      <Route
        path="/customer/profile"
        isPrivate
        isCustomer
        exact
        component={AccountProfileView}
      />
      <Route
        path="/driver/profile"
        isPrivate
        isDriver
        exact
        component={AccountProfileView}
      />
      <Route
        path="/processor/profile"
        isPrivate
        isProcessor
        exact
        component={AccountProfileView}
      />

      <Route
        path="/admin/account_management"
        isAdmin
        isPrivate
        exact
        component={AccountView}
      />

      <Route
        path="/admin/booking"
        isPrivate
        exact
        isAdmin
        component={BookingView}
      />

      <Route
        path="/processor/processing"
        isPrivate
        isProcessor
        exact
        component={ProcessingView}
      />

      <Route
        path="/test"
        exact
        component={VirtualizedList}
      />

      <Route path="/customer/collection" isPrivate exact component={CollectionView} />

      <Route path="/404" component={notFound} />

      <Route path="/403" component={unauthorized} />

      <Route path="/401" component={tokenExpired} />

      <Route path="/500" component={serverErr} />

      <Route
        path="/customer/report"
        isCustomer
        exact
        isPrivate
        component={ReportView}
      />

      <Route path="/register" exact component={SignupView} />

      <Route path="/user/forgotPwd" exact component={ForgotView} />

      <Route path="/user/forgotPending" exact component={ForgotPendingView} />

      <Route path="/user/pwd" component={ResetView} />

      <Route path="/" exact component={LoginView} isLogin />

      <Route component={notFound} />
    </Switch>
  );
};
