import React from 'react';
import styled from 'styled-components';
import { CustomCircleLoading } from 'components/base/loading';

function FullScreenLoading({ visible, size }) {
  if (visible === false) return null;
  return (
    <Styled.FullScreenLoading>
      <CustomCircleLoading size={size ? size : 30} />
    </Styled.FullScreenLoading>
  );
}

const Styled = {
  FullScreenLoading: styled.div`
    background: transparent;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default FullScreenLoading;
