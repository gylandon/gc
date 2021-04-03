import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './header.less';
import { FaUserCircle } from 'react-icons/fa';

const url = 'https://www.greencollect.org';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          alt="Green Collect"
          src="https://static1.squarespace.com/static/561dc817e4b09810cb60fb39/t/5afbb5c670a6ad438c19ae0c/1588657584510/?format=1500w"
        />
      </div>
      <Breadcrumb separator=" " className={styles.naviContainer}>
        <Breadcrumb.Item href={`${url}`}>HOME</Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/collection-services-2`}>
          COLLECTION
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/retail-shops`}>RETAIL</Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/upcycle-kids`}>
          EDUCATION
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/media`}>LATEST NEWS</Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/about`}>ABOUT US</Breadcrumb.Item>
        <Breadcrumb.Item href={`${url}/contact-us`}>CONTACT</Breadcrumb.Item>
        <Breadcrumb.Item href="/" className={styles.choseHighlight}>
          SIGN IN
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.avatar}>
          <FaUserCircle size="20" />
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
