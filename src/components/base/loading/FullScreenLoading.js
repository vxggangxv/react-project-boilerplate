import React from 'react';
import styled from 'styled-components';
import { CustomLoadingCircle } from 'components/base/loading';

function FullScreenLoading({ visible, size }) {
  if (visible === false) return null;

  return (
    <Styled.FullScreenLoading>
      <span className="loading__center">
        <CustomLoadingCircle size={size ? size : 30} />
      </span>
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
    z-index: 100000;
    .loading__center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `,
};

export default FullScreenLoading;
