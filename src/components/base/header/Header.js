import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <Styled.Header>
      <header className="header">
        <NavMenu to="/" text="Home" />
        <NavMenu to="/about" text="About" />
      </header>
    </Styled.Header>
  );
}

function NavMenu(props) {
  const { text = '', to = '/' } = props;
  return <NavLink to={to}>{text}</NavLink>;
}

const Styled = {
  Header: styled.div`
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
    }
  `,
};

export default Header;
