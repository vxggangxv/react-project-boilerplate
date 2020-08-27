import React from 'react';
import styled from 'styled-components';

function PlainTemplate(props) {
  const { header, main, children } = props;
  return (
    <Styled.PlainTemplate>
      <main className="main">
        <section>{header}</section>
        <section>{main || children}</section>
      </main>
    </Styled.PlainTemplate>
  );
}

const Styled = {
  PlainTemplate: styled.main`
    width: 1200px;
    margin: auto;

    @media screen and (max-width: 1200px) {
      width: 100%;
      padding: 15px;
    }
  `,
};
// sreen

export default PlainTemplate;
