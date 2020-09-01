import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { logo } from 'components/base/images';

const navigation = [
  {
    path: '/',
    text: 'Home',
  },
  {
    path: '/about',
    text: 'About',
  },
];

function AppHeader() {
  return (
    <Styled.AppHeader data-component-name="AppHeader">
      <header className="header">
        <h1>
          <Link to="/">
            <img src={logo} alt="Logo" className="header__logo" />
            <span className="sr-only">사이트 제목</span>
          </Link>
        </h1>
        <nav className="header__nav">
          <h1 className="sr-only">메인 메뉴</h1>
          {navigation.map((item, idx) => (
            <NavLink to={item.path} key={idx} className="header__link">
              {item.text}
            </NavLink>
          ))}
        </nav>
      </header>
    </Styled.AppHeader>
  );
}

const Styled = {
  AppHeader: styled.div`
    position: relative;
    &,
    .header {
      width: 100%;
      height: 100px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      text-align: center;
      display: flex;
      align-items: center;
    }
    .header__logo {
      width: 80px;
    }
    .header__nav {
      position: relative;
    }
    .header__link {
      &:not(:first-of-type) {
        margin-left: 10px;
      }
    }
  `,
};

export default AppHeader;
