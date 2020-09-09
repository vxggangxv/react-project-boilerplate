import React from 'react';
import styled from 'styled-components';

function CustomToastContent({ content }) {
  return (
    <Styled.CustomToastContent data-component-name="CustomToastContent">
      <ErrorIcon className="toastContent__icon_alert" />
      {content}.
    </Styled.CustomToastContent>
  );
}

const Styled = {
  CustomToastContent: styled.div`
    display: flex;
    align-items: center;
    padding: 8 10px;
    font-weight: 700;
    .toastContent__icon_alert {
      margin-right: 5px;
    }
  `,
};

export default CustomToastContent;
