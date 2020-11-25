import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { _color } from 'styles/_variables';
import { fontFamilyValue } from 'styles/utils';
import Color from 'color';
import cx from 'classnames';

function MuiButton(props) {
  const { children, config: customConfig = {} } = props;
  const muiProps = {
    ...props,
  };
  delete muiProps.customConfig;
  const {
    width,
    height,
    fontColor,
    borderColor,
    color = _color.blue,
    wrapperStyle = {},
    buttonStyle = {},
  } = customConfig;

  return (
    <Styled.MuiButton
      data-component-name="MuiButton"
      {...customConfig}
      fullWidth={props.fullWidth}
      color={Color(color)}
      darkenColor={Color(color).darken(0.12)}
      className={props.className}
      style={wrapperStyle}
    >
      {/* {children} */}
      <Button {...muiProps} style={buttonStyle} className="button">
        {children}
      </Button>
    </Styled.MuiButton>
  );
}

const Styled = {
  MuiButton: styled.div`
    display: inline;
    /* &[data-component-name='MuiWrapper'] { */
    .button {
      // width apply
      width: ${props => (props.width ? props.width : props.fullWidth ? `100%` : `auto`)};
      // height apply, default height: 40px
      height: ${props => (props.height ? props.height : '40px')};
      // width, fullWidth 있을 경우 padding: 0
      padding: ${props => (props.width || props.fullWidth ? 0 : `6px 16px`)};
      color: ${props => (props.fontColor ? props.fontColor : '#fff')};
      font-family: ${fontFamilyValue};
      background-color: ${props => props.color};
      border-color: ${props => (props.borderColor ? props.borderColor : 'none')};
      &:hover {
        background-color: ${props => props.darkenColor};
      }
      &.MuiButton-root {
        text-transform: initial;
      }
    }
  `,
};

export default MuiButton;
