import React from 'react';
import { _color } from 'styles/_variables';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

/**
 *
 * @param {*} props
 */
function CustomCircleLoading({ size = 30, color = _color.blue }) {
  return (
    <Styled.CustomCircleLoading color={color}>
      <CircularProgress size={size} />
    </Styled.CustomCircleLoading>
  );
}

export default CustomCircleLoading;

const Styled = {
  CustomCircleLoading: styled.div`
    .MuiCircularProgress-colorPrimary {
      color: ${({ color }) => color};
    }
  `,
};
