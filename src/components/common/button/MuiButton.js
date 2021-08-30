import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { _color } from 'styles/_variables';
import { color, fontFamilyValue } from 'styles/utils';
import Color from 'color';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import cx from 'classnames';

const StartIcon = styled.span`
  margin-left: ${({ width, iconMarginAlign }) => `-${width + iconMarginAlign}px`};
  margin-right: ${({ iconMarginAlign }) => iconMarginAlign && `${iconMarginAlign}px`};
`;

const EndIcon = styled.span`
  margin-left: ${({ iconMarginAlign }) => iconMarginAlign && `${iconMarginAlign}px`};
  margin-right: ${({ width, iconMarginAlign }) => `-${width + iconMarginAlign}px`};
`;

/*
 * <MuiButton
 *    disableElevation
 *    variant="contained"
 *    color="primary"
 *    config={{ color: color.navy }}
 *    className="checkout__btn"
 *  >
 *    버튼
 * </MuiButton>
 */
/**
 * @param {boolean} disableElevation : 뜨는효과 삭제
 * @param {string} variant : contained(색상버튼), outlined(border버튼)
 * @param {string} color : primary색상(적용)
 * @param {object} config : config옵션
 * @param {string} className : button 클래스 적용
 */
const MuiButton = props => {
  const startIconRef = useRef();
  const [startIconWidth, setStartIconWidth] = useState(0);
  const endIconRef = useRef();
  const [endIconWidth, setEndIconWidth] = useState(0);
  const { children = null, fullWidth = false, className = '', config = {} } = props;
  // mui error를 피하기 위해 분류
  const muiProps = {
    ...props,
  };
  delete muiProps.config;
  const {
    minWidth,
    height,
    width,
    color, // 배경 색
    borderColor,
    fontColor,
    fontSize,
    borderWidth,
    wrapperClassName = '', // TODO: 제거 예정
    startIcon = null,
    endIcon = null,
    iconMarginAlign = 0, // 아이콘 등록시 좌우 당김
  } = config;

  const primaryColor = color ? color : _color.blue;
  const primaryfontColor = fontColor ? fontColor : '#fff';
  config.primaryColor = primaryColor;
  config.primaryfontColor = primaryfontColor;
  config.fullWidth = props.fullWidth;
  // console.log(config, 'config');

  // memoizaion을 위한 dependency array
  // const childrenProps = Object.keys(muiProps).reduce((acc, curr) => {
  //   return acc.concat(children.props[curr]);
  // }, []);

  const dataType = props['data-type'];
  // radio, size 영향을 받게 하기 위해 prop여부 확인
  const isChangeSize = dataType === 'radio' || !!props.size;

  // console.log(props['data-type'], 'props.dataType');

  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        contrastText: primaryfontColor,
      },
      secondary: {
        main: _color.navy,
        contrastText: '#fff',
      },
      // secondary: {
      //   main: color ? color : '#11cb5f',
      //   contrastText: '#fff',
      // },
    },
    typography: {
      fontFamily: fontFamilyValue,
    },
    props: {
      // Styled Component로 변경 하여 사용 불가 에러메시지
      MuiButtonBase: {
        // disableRipple: true,
        // disableElevation: true,
      },
    },
  });

  /* 
  * 색상 적용 예시
  * muiButton Error는 무시
  theme.palette.red = theme.palette.augmentColor({
    main: _color.red,
    main: '#fff',
  });

  const isSuccessOutlined = style => props =>
    props.color === 'red' && props.variant === 'contained' ? style : {};

  theme.overrides = {
    MuiButton: {
      root: {
        color: isSuccessOutlined(theme.palette.red.contrastText),
        backgroundColor: isSuccessOutlined(theme.palette.red.main),
        '&:hover': {
          backgroundColor: isSuccessOutlined(theme.palette.red.dark),
        },
      },
    },
  };
  */

  // custom button error
  theme.palette.error = theme.palette.augmentColor({
    main: _color.red,
  });

  const isSuccessOutlined = style => props =>
    props.color === 'red' && props.variant === 'outlined' ? style : {};

  theme.overrides = {
    MuiButton: {
      root: {
        color: isSuccessOutlined(theme.palette.error.main),
        borderColor: isSuccessOutlined(`${theme.palette.error.main} !important`),
        backgroundColor: isSuccessOutlined('#fff'),
        '&:hover': {
          backgroundColor: isSuccessOutlined(`${Color(theme.palette.error.main).alpha(0.04)}`),
        },
      },
    },
  };

  // SECTION: init set icon width
  useEffect(() => {
    if (startIconRef.current) {
      setStartIconWidth(startIconRef.current.clientWidth);
    }
    if (endIconRef.current) {
      setEndIconWidth(endIconRef.current.clientWidth);
    }
  }, [startIconRef.current, endIconRef.current]);

  return (
    <ThemeProvider theme={theme}>
      <Styled.MuiButton
        data-component-name="MuiButton"
        {...muiProps}
        config={config}
        className={cx(`button ${className}`, { size: isChangeSize, label: dataType === 'label' })}
      >
        {startIcon && (
          <StartIcon
            className="button__icon start_icon"
            width={startIconWidth}
            iconMarginAlign={iconMarginAlign}
            ref={startIconRef}
          >
            {startIcon}
          </StartIcon>
        )}
        {children}
        {endIcon && (
          <EndIcon
            className="button__icon end_icon"
            width={endIconWidth}
            iconMarginAlign={iconMarginAlign}
            ref={endIconRef}
          >
            {endIcon}
          </EndIcon>
        )}
        {/* {useMemo(() => ({ children }), [...childrenProps])} */}
      </Styled.MuiButton>
    </ThemeProvider>
  );
};

const Styled = {
  MuiButton: styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // width apply
    min-width: ${({ config }) => config.minWidth && config.minWidth};
    width: ${({ config }) => config.width && config.width};
    &:not(.size) {
      // height apply, default height: 40px
      height: ${({ config }) => (config.height ? config.height : '40px')};
      // width, fullWidth 있을 경우 padding: 0
      padding: ${({ config }) => (config.width || config.fullWidth ? 0 : `0px 16px`)};
      font-size: ${({ config }) => (config.fontSize ? config.fontSize : '14px')};
    }
    &.label {
      .MuiButton-label > label,
      .MuiButton-label {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }
    // Mui color change
    &.MuiButton-outlinedPrimary {
      background-color: #fff;
    }
    &.MuiButton-outlinedPrimary,
    &.MuiButtonGroup-groupedOutlinedPrimary:hover {
      border-color: ${({ config }) =>
        config.borderColor ? config.borderColor : config.primaryColor};
      color: ${({ config }) => (config.borderColor ? config.borderColor : config.primaryColor)};
    }
    &.MuiButton-containedPrimary {
      border: 1px solid transparent;
    }
    &.MuiButton-containedPrimary:hover {
      background-color: ${({ config }) => Color(config.primaryColor).darken(0.12)};
    }
    // global active, outline styles in styles/base.js

    .xs,
    .sm {
      min-width: initial;
    }
    .button__icon {
      line-height: 0;
      /* &.start_icon {
        margin-left: ${({ config }) => config.iconMarginAlign && `-${config.iconMarginAlign}px`};
        margin-right: ${({ config }) => config.iconMarginAlign && `${config.iconMarginAlign}px`};
      }
      &.end_icon {
        margin-left: ${({ config }) => config.iconMarginAlign && `${config.iconMarginAlign}px`};
        margin-right: ${({ config }) => config.iconMarginAlign && `-${config.iconMarginAlign}px`};
      } */
    }
    // add custom style
    &.inset-shadow-default {
      box-shadow: inset 3px 3px 6px rgb(0 0 0 / 16%);
    }
    &.border-radius-round {
      border-radius: 20px;
    }
  `,
};

// background-color: ${({ config }) => config.color && `${config.color} !important`};
// color: ${({ config }) => config.fontColor && `${config.fontColor} !important`};

export default React.memo(MuiButton);
