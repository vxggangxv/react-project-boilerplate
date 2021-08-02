import React, { useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { _color } from 'styles/_variables';
import { color, fontFamilyValue } from 'styles/utils';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import cx from 'classnames';

export default React.memo(function MuiWrapper(props) {
  const { children, config = {}, isGlobalStyle = false, className = '', childrenContent } = props;
  const muiProps = {
    ...props,
  };
  delete muiProps.config;
  const { height, fontColor, color, borderColor, errorColor, styleConfig = {} } = config;
  const defaultColor = _color.blue;

  const dataType = props['data-type'];
  // console.log('children.props', children.props);
  // memoizaion을 위한 dependency array
  const childrenProps = Object.keys(children.props).reduce((acc, curr) => {
    return acc.concat(children.props[curr]);
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: defaultColor,
        // contrastText: primaryfontColor,
      },
      error: {
        main: _color.red,
      },
      // secondary: {
      //   main: color ? color : '#11cb5f',
      //   contrastText: '#fff',
      // },
    },
    typography: {
      fontFamily: fontFamilyValue,
    },
    props: {},
  });

  return (
    <Styled.MuiWrapper
      data-component-name="MuiWrapper"
      {...config}
      defaultColor={defaultColor}
      fullWidth={children.props?.fullWidth}
      className={cx(`muiWrapper ${className}`, { styleNone: dataType === 'default' })}
    >
      {/* <ThemeProvider theme={theme}>{children}</ThemeProvider> */}
      {useMemo(
        () => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
        [...childrenProps],
      )}
      {childrenContent}
      {isGlobalStyle && <Styled.GlobalStyles {...config} defaultColor={defaultColor} />}
    </Styled.MuiWrapper>
  );
});

const Styled = {
  GlobalStyles: createGlobalStyle`
    .MuiPopover-root {
      .MuiList-root {
        .MuiMenuItem-gutters {
          padding-left: 10px;
          padding-right: 10px;
        }
        // multiple select padding
        // checkbox color
        .MuiCheckbox-root {
          padding: 2px 0;
          margin-right: 8px;
          &:hover {
            background-color: transparent;  
          }
          .MuiSvgIcon-root {
            font-size: 20px;
          }
        }
      }
    }
  `,
  MuiWrapper: styled.div`
    position: relative;
    display: inline-flex;
    // &[data-component-name='MuiWrapper']
    // width apply
    min-width: ${({ minWidth }) => minWidth && minWidth};
    width: ${props => props.fullWidth && `100%`};
    width: ${props => props.width && props.width};
    // height apply, default height: 40px
    height: ${props => (props.height ? props.height : '40px')};
    color: ${props => (props.fontColor ? props.fontColor : '#333')};
    font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
    &.sm {
      height: 34px;
      .MuiOutlinedInput-input {
        line-height: 34px !important;
      }
    }
    &.styleNone {
      height: initial;
      padding: initial;
    }
    .MuiFormControl-root {
      height: 100%;
    }
    .MuiInputBase-root {
      background-color: #fff;
    }
    .MuiButtonBase-root,
    .MuiInputBase-root,
    .MuiSelect-select,
    .MuiInputBase-root input::placeholder {
      height: 100%;
      font-size: inherit;
      font-family: inherit;
    }
    .MuiOutlinedInput-input {
      padding-top: 0px;
      padding-bottom: 0px;
      &:not(.MuiOutlinedInput-inputMultiline) {
        line-height: ${props => (props.height ? props.height : '40px')};
      }
    }
    .MuiSelect-selectMenu {
      height: initial;
    }
    .MuiOutlinedInput-notchedOutline {
      border-width: 1px !important;
    }
    .MuiOutlinedInput-multiline {
      padding: 14px;
    }
    /* .Mui-disabled {
      background-color: #f4f4f4;
    } */
    /* .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
    .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline,
    .MuiInput-underline:after,
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-width: 1px !important;
    } */
    /* .MuiInputBase-root input::placeholder {
      font-size: 14px;
    } */
    .MuiInput-underline:after,
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom-width: 1px;
    }

    .MuiSvgIcon-root {
      &.cursor {
        cursor: pointer;
      }
    }
    .MuiFormGroup-root {
      flex-direction: initial;
    }
    .MuiFormControlLabel-label.MuiTypography-body1 {
      font: inherit;
    }
    // border-radius custom
    .MuiInputBase-root,
    .MuiTextField-root {
      color: inherit;
      &.radius-sm {
        .MuiSelect-root,
        .MuiInputBase-root {
          border-radius: 3px;
        }
      }
      &.radius-md {
        .MuiSelect-root,
        .MuiInputBase-root {
          border-radius: 5px;
        }
      }
    }
  `,
};

/*
 * MuiWrapper, TextField, Select 샘플
<MuiWrapper
  childrenContent={
    <>
      {isShowTimer && <span className="verify__input_timer">{timer}</span>}
      {checkCodeStatus && <span className="input__icon_success"></span>}
    </>
  }
>
// TextField
  <TextField
    variant="outlined"
    fullWidth
    disabled
    placeholder={licenseFile.value.name}
    error={isSubmit && isRequiredBusiness ? !licenseFile.value.name : false}
  />
</MuiWrapper>
<CustomFormHelperText
  className={cx(`error`, {
    active: isSubmit && isRequiredBusiness ? !licenseFile.value.name : false,
  })}
>
  <T>reg.required</T>
</CustomFormHelperText>

// Select
<FormControl
  fullWidth
  variant="outlined"
  error={isSubmit ? !region.value : false}
  >
  <Select
  MenuProps={{
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
    marginThreshold: 10,
  }}
  displayEmpty
  name="country"
  value={country.value}
  onChange={e => {
    country.onChange(e);
    region.setValue('');
  }}
  >
  {countryList?.length > 0 &&
    countryList.map(item => (
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
*/

/*
 * AutoComplete 샘플
<Autocomplete
  freeSolo
  id="email"
  value={email.value}
  onChange={(e, newVal) => email.setValue(newVal)}
  options={resentLoginList?.length > 0 ? resentLoginList.map(option => option) : []}
  renderInput={params => (
    <MuiWrapper>
      <TextField
        {...params}
        id="email"
        name="email"
        variant="outlined"
        fullWidth
        autoComplete="off"
        onChange={email.onChange}
      />
    </MuiWrapper>
  )}
/>
*/

/*
 * formLabel 샘플
<FormControlLabel
  control={
    <MuiWrapper>
      <Checkbox
        checked={checkSharePatient.value}
        color="primary"
        onChange={e => checkSharePatient.setValue(e.target.checked)}
      />
    </MuiWrapper>
  }
  label={
    <span>
      <T>project.sharePatientName</T>
    </span>
  }
  labelPlacement="end"
/>
*/

/**
 * select 창 좌우 패딩 및 아이콘 위치 변경
 *
 * .MuiSelect-iconOutlined {
 *   right: 0;
 * }
 * .MuiOutlinedInput-input {
 *   padding-left: 10px;
 *   padding-right: 17px;
 * }
 */
