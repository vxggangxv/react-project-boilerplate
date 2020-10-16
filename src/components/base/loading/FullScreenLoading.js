import React from 'react';
import styled from 'styled-components';
import { CircularLoading } from 'components/base/loading';
import PropTypes from 'prop-types';

function FullScreenLoading({ visible, size }) {
  if (visible === false) return null;
  return (
    <Styled.FullScreenLoading data-component-name="FullScreenLoading">
      <CircularLoading size={size} />
    </Styled.FullScreenLoading>
  );
}

FullScreenLoading.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.number,
};

const Styled = {
  FullScreenLoading: styled.div`
    z-index: 100;
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
