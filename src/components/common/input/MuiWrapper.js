import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { color, fontFamilyValue } from 'styles/utils';
import { _color } from 'styles/_variables';

function MuiWrapper(props) {
  const { children, config: customConfig = {} } = props;
  const muiProps = {
    ...props,
  };
  delete muiProps.config;
  const { height, fontColor, color, borderColor, errorColor, styleConfig = {} } = customConfig;
  const defaultColor = _color.blue;

  return (
    <Styled.MuiWrapper
      data-component-name="MuiWrapper"
      {...customConfig}
      defaultColor={defaultColor}
      fullWidth={props.fullWidth}
      className={props.className}
    >
      {children}
    </Styled.MuiWrapper>
  );
}

const Styled = {
  MuiWrapper: styled.div`
    position: relative;
    display: flex;
    &[data-component-name='MuiWrapper'] {
      // width apply
      width: ${props => (props.width ? props.width : props.fullWidth ? `100%` : `auto`)};
      // height apply, default height: 40px
      height: ${props => (props.height ? props.height : '40px')};
      color: ${props => (props.fontColor ? props.fontColor : '#000')};
      font-family: ${fontFamilyValue};
      .MuiButtonBase-root,
      .MuiInputBase-root {
        height: 100%;
      }
      .MuiSelect-selectMenu {
        height: inherit;
        display: flex;
        align-items: center;
      }
      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
      .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline,
      .MuiInput-underline:after,
      .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-width: 1px;
      }
      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
      .MuiInput-underline:after {
        border-color: ${props => (props.borderColor ? props.borderColor : props.defaultColor)};
      }
      .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline,
      .MuiInput-underline.Mui-error:after {
        border-color: ${props => (props.borderColor ? props.errorColor : _color.red)};
      }
      .MuiInputBase-root input::placeholder {
        font-size: 14px;
      }
      .MuiSvgIcon-root {
        &.cursor {
          cursor: pointer;
        }
      }
      .MuiSvgIcon-colorPrimary {
        color: ${props => (props.color ? props.color : props.defaultColor)};
      }
    }
  `,
};

export default MuiWrapper;
