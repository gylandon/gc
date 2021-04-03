import React from 'react';
import styles from './header.less';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAction } from '@actions';
import { Breadcrumb, Divider, Button, Menu } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const HeaderLogged = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const roleId = useSelector(state => state.auth[0].data.role[0].rid)
  const location = history.location.pathname.split('/')[2]
  const role = history.location.pathname.split('/')[1]

  const handleClick = (e) => {
    if(e === 'signout'){
      history.push('/');
      logoutAction(dispatch);
      
    }else if(e === 'profile'){
      history.push(`/${role}/profile`)
    }else if(e === 'dashboard'){
      history.push(`/${role}/dashboard`)
    }else if(e === 'processing'){
      history.push(`/${role}/processing`)
    }else if(e === 'booking'){
      history.push(`/${role}/booking`)
    }
    else if(e === 'report'){
      history.push(`/${role}/report`)
    }
    else if(e === 'account'){
      history.push(`/${role}/account_management`)
    }else if(e === 'collection'){
      history.push(`/${role}/collection`)
    }
    else if(e === 'driver'){
      history.push(`/driver/dashboard`)
    }
    else if(e === 'processor'){
      history.push(`/processor/dashboard`)
    }
  };

  const switchRole = (
    <Menu>
      <Menu.Item>
        <span onClick={() => handleClick('driver')}> Driver </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={() => handleClick('processor')}> Processor </span>
      </Menu.Item>
    </Menu>
  );

  const logout = () => {
    return (
      <div className={styles.avatarafter}>
        <FaUserCircle size="20" />
        <div className={styles.cardContainer}>
          <div className={styles.cardItem}>
            <span onClick={() => handleClick('profile')}> Profile </span>
          </div>
          <Divider className={styles.divider}></Divider>
          <div className={styles.cardItem}>
            <span onClick={() => handleClick('signout')}> Log out </span>
          </div>
        </div>
      </div>
    );
  };

  const Links = () => {
    if (role == 'customer') {
      return (
        <div className={styles.naviedContainer}>
          <Breadcrumb separator=" " className={styles.naviContainer}>
            {location !== 'dashboard' ? (
              <Breadcrumb.Item onClick={() => handleClick('dashboard')}>
                Dashboard
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('dashboard')}
                style={{ color: '#019638' }}
              >
                Dashboard
              </Breadcrumb.Item>
            )}
            {location !== 'collection' ? (
              <Breadcrumb.Item onClick={() => handleClick('collection')}>
                collection
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                href={'/customer/collection'}
                style={{ color: '#019638' }}
              >
                collection
              </Breadcrumb.Item>
            )}
            {location !== 'report' ? (
              <Breadcrumb.Item
                onClick={() => handleClick('report')}
                style={{ color: 'rgba(0, 0, 0, 0.45)' }}
              >
                report
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('report')}
                style={{ color: '#019638' }}
              >
                report
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          {logout()}
        </div>
      );
    } else if (role == 'driver' || role == 'processor') {
      return (
        <div className={styles.naviedContainer}>
          <Breadcrumb separator=" " className={styles.naviContainer}>
            {location!=='dashboard'?
              <Breadcrumb.Item onClick={()=>handleClick('dashboard')}>Dashboard</Breadcrumb.Item>
            :
              <Breadcrumb.Item onClick={()=>handleClick('dashboard')} style={{color:'#019638'}}>Dashboard</Breadcrumb.Item>
            }
            {location!=='processing'?
              <Breadcrumb.Item onClick={()=>handleClick('processing')} style={{color:'rgba(0, 0, 0, 0.45)'}}>collections</Breadcrumb.Item>
            :
              <Breadcrumb.Item onClick={()=>handleClick('processing')} style={{color:'#019638'}}>collections</Breadcrumb.Item>
            }
            {
              roleId == 4 &&
              <Breadcrumb.Item overlay={switchRole} style={{color:'rgba(0, 0, 0, 0.45)'}}>switch</Breadcrumb.Item>
            }
          </Breadcrumb>
          {logout()}
        </div>
      );
    } else {
      return (
        <div className={styles.naviedContainer}>
          <Breadcrumb separator=" " className={styles.naviContainer}>
            {location !== 'dashboard' ? (
              <Breadcrumb.Item onClick={() => handleClick('dashboard')}>
                Dashboard
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('dashboard')}
                style={{ color: '#019638' }}
              >
                Dashboard
              </Breadcrumb.Item>
            )}
            {location !== 'booking' ? (
              <Breadcrumb.Item onClick={() => handleClick('booking')}>
                booking
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('booking')}
                style={{ color: '#019638' }}
              >
                booking
              </Breadcrumb.Item>
            )}
            {location !== 'report' ? (
              <Breadcrumb.Item onClick={() => handleClick('report')}>
                report
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('report')}
                style={{ color: '#019638' }}
              >
                report
              </Breadcrumb.Item>
            )}
            {location !== 'account_management' ? (
              <Breadcrumb.Item onClick={() => handleClick('account')}>
                accounts
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                onClick={() => handleClick('account')}
                style={{ color: '#019638' }}
              >
                accounts
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item
              overlay={switchRole}
              style={{ color: 'rgba(0, 0, 0, 0.45)' }}
            >
              switch
            </Breadcrumb.Item>
          </Breadcrumb>
          {logout()}
        </div>
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <a href="https://www.greencollect.org/">
            <img
              className={styles.img}
              alt="Green Collect"
              src="https://static1.squarespace.com/static/561dc817e4b09810cb60fb39/t/5afbb5c670a6ad438c19ae0c/1588657584510/?format=1500w"
            />
          </a>
        </div>
        {Links()}
      </div>
      <Divider className={styles.divider} />
      {location !== 'dashboard' ? (
        <Button type="primary" onClick={() => history.goBack()}>
          Back
        </Button>
      ) : null}
    </div>
  );
};
