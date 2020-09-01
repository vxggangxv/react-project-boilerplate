import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function AppFooter(props) {
  return (
    <Styled.AppFooter>
      <footer>푸터</footer>
    </Styled.AppFooter>
  );
}

const Styled = {
  AppFooter: styled.div`
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

export default AppFooter;
