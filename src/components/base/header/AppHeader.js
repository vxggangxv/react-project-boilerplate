import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { logo } from 'components/base/images';

// TODO: 차후 mapper로 이동
const navigation = [
  {
    path: '/home',
    text: 'Home',
  },
  {
    path: '/about',
    text: 'About',
  },
  {
    path: '/test/list',
    text: 'Test',
  },
];

function AppHeader({ location: { pathname } }) {
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
          <ul className="header__nav_list">
            {navigation.map((item, idx) => (
              <li key={idx} className={cx('header__nav_item', { active: pathname === item.path })}>
                <NavLink to={item.path} className="header__link">
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
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
    .header__nav_list {
      display: flex;
    }
    .header__nav_item {
      &:not(:first-of-type) {
        margin-left: 10px;
      }
      &.active {
        text-decoration: underline;
      }
      .header__link {
      }
    }
  `,
};

export default withRouter(AppHeader);
