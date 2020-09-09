import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { AUTH_CHANGEPASS_SAGAS } from 'store/actions';
import { useDidUpdateEffect, Popup, customPopup } from 'lib/utils';
import {
  color,
  font,
  buttonBlue,
  buttonWhite,
  fontFamily,
  muiOutlinedInputFocus,
  muiOutlinedInputError,
} from 'styles/__utils';
import cx from 'classnames';
import { PlainModal, ModalComplete } from 'components/common/modal';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { VisibleEyes } from 'components/common/icon';

import { regPassword } from 'lib/library';
import { mapper } from 'lib/mapper';

const { HANDLEEVENTTYPE } = mapper;

const ModalPasswordChangeState = {
  password: {
    value: '',
    show: false,
    regPassword: null,
  },
  changePassword: {
    value: '',
    show: false,
    regPassword: null,
  },
  checkPassword: {
    value: '',
    show: false,
    regPassword: null,
  },
  error: {
    password: {
      isError: false,
      errorMessage: '* 8자 이상 16자 이하의 문자, 특수 문자 및 숫자를 조합하여 설정해주세요',
    },
    checkPassword: {
      isError: false,
      errorMessage: '* 조건에 맞는 비밀번호가 일치하지 않습니다',
    },
  },
  check: {
    password: null,
    changePassword: null,
    checkPassword: null,
    attempt: 0,
  },
  modal: {
    current: null,
    passwordChangeFail: false,
  },
};

function ModalPasswordChange(props) {
  const { onClick = () => {} } = props;
  // const classes = useStyles();
  const { info: infoReducer, auth: authReducer } = useSelector(state => state);
  const [values, setValues] = useImmer(ModalPasswordChangeState);
  const {
    password: { value: passwordVal, regPassword: isRegPass, show: passwordShow },
    changePassword: {
      value: changePasswordVal,
      regPassword: isChangeRegPass,
      show: changePasswordShow,
    },
    checkPassword: {
      value: checkPasswordVal,
      regPassword: isRegCheckPass,
      show: checkPasswordShow,
    },
  } = values;
  const rInfoUserEmail = infoReducer.selfInformation.info.email;
  const handleMouseDownPassword = useCallback(event => {
    event.preventDefault();
  }, []);

  // const iconPasswordVisible = value => {
  //   return values[value].show ? <Visibility /> : <VisibilityOff />;
  // };

  /**
   * NOTE: handleChange 함수
   * @param {*} config
   */
  const handleChange = useCallback(
    config => {
      const { type, e, name } = config;
      const targetValue = e.target.value;
      setValues(draft => {
        // draft[type].regPassword = null;
        draft[type].value = targetValue;
      });
    },
    [values.password, values.changePassword, values.checkPassword],
  );

  /**
   * NOTE: handleClick 함수
   * @param {*} config
   */
  const handleClick = useCallback(
    config => {
      const { type, name } = config;
      if (type === 'eyeIcon') {
        setValues(draft => {
          draft[name].show = !draft[name].show;
        });
      }
    },
    [values.password.show, values.changePassword.show, values.checkPassword.show],
  );

  // password change ok 버튼 이벤트 관리
  const handleSubmit = useCallback(() => {
    // const handleSubmit = () => {
    // NOTE: 유효성 검사
    const isValidPasswordValue = regPassword(passwordVal);
    const isValidchangePasswordValue = regPassword(changePasswordVal);
    const isCheckPasswordValue = changePasswordVal === checkPasswordVal && checkPasswordVal !== '';
    // 유효성 검사
    let isValidSubmitValue = [
      !isValidPasswordValue,
      !isValidchangePasswordValue,
      !isCheckPasswordValue,
    ];
    const isFailureSubmit = isValidSubmitValue.some(item => item === true);

    setValues(draft => {
      const regArray = ['password', 'changePassword', 'checkPassword'];
      regArray.map(item => {
        draft[item].regPassword = null;
      });

      if (!isValidPasswordValue) {
        draft.password.regPassword = false;
      }

      if (!isValidchangePasswordValue) {
        draft.changePassword.regPassword = false;
      }

      if (!isCheckPasswordValue) {
        draft.checkPassword.regPassword = false;
      }
    });

    if (isFailureSubmit) return false;

    let submitData = {
      email: rInfoUserEmail,
      oldPass: passwordVal,
      newPass: changePasswordVal,
    };
    // console.log(submitData, 'submitData');
    AUTH_CHANGEPASS_SAGAS(submitData);
  }, [passwordVal, changePasswordVal, checkPasswordVal]);

  // useEffect(() => {
  //   customPopup({
  //     type: 'alert',
  //     title: 'Success',
  //     content: 'Update Complete.',
  //     dim: true,
  //     isOpen: true,
  //   });
  // }, []);

  useDidUpdateEffect(() => {
    setValues(draft => {
      const valueArray = ['password', 'changePassword', 'checkPassword'];
      valueArray.map(item => {
        draft[item].value = '';
      });
    });

    if (authReducer.changePass.success) {
      Popup({
        title: 'Success',
        content: 'Update Complete.',
        dim: true,
        isOpen: true,
        onExited() {
          onClick({ type: 'dim' });
        },
      });
      return;
    }
    if (authReducer.changePass.failure) {
      Popup({
        title: 'Failure',
        content: `Don't match old password.`,
        dim: true,
        isOpen: true,
      });
      return;
    }
  }, [authReducer.changePass.success, authReducer.changePass.failure]);

  return (
    <>
      <Styled.ChangePasswordForm>
        <h2 className="changePass__title">PASSWORD RESET</h2>
        <form action="">
          <Grid container>
            <Grid item xs={12}>
              <label htmlFor="password" className="input__label">
                <span>OLD PASSWORD</span>
              </label>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                id="password"
                autoComplete="off"
                fullWidth
                inputProps={{
                  maxLength: 20,
                }}
                className={cx(`input__placeholder`)}
                error={isRegPass === false}
                type={passwordShow ? 'text' : 'password'}
                value={passwordVal}
                onChange={e => handleChange({ e, type: 'password' })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      className={cx({ active: values.password.show })}
                      onClick={() => handleClick({ type: 'eyeIcon', name: 'password' })}
                    >
                      <VisibleEyes show={values.password.show} />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info`)}>
                <span className={cx(`input__info_text`, { active: isRegPass === false })}>
                  * Password is invalid
                </span>
              </div>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="changePassword" className="input__label">
                <span>NEW PASSWORD</span>
              </label>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                id="changePassword"
                autoComplete="off"
                fullWidth
                inputProps={{
                  maxLength: 20,
                }}
                className={cx(`input__placeholder`)}
                error={isChangeRegPass === false}
                type={changePasswordShow ? 'text' : 'password'}
                value={changePasswordVal}
                onChange={e => handleChange({ e, type: 'changePassword' })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle changePassword visibility"
                      edge="end"
                      className={cx({ active: values.changePassword.show })}
                      onClick={() => handleClick({ type: 'eyeIcon', name: 'changePassword' })}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      <VisibleEyes show={values.changePassword.show} />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info changePassword`)}>
                <span className={cx(`input__info_text`, { active: isChangeRegPass === false })}>
                  * Please enter letter/special charaters and numbers within 8 to 16
                  {/* * Mixing letters/special characters and numbers within 8 to 16 characters */}
                </span>
              </div>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="checkPassword" className="input__label">
                <span>PASSWORD CONFIRM</span>
              </label>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                id="checkPassword"
                autoComplete="off"
                fullWidth
                inputProps={{
                  maxLength: 20,
                }}
                className={cx(`input__placeholder`)}
                error={isRegCheckPass === false}
                type={checkPasswordShow ? 'text' : 'password'}
                value={checkPasswordVal}
                // onChange={handleChange('checkPassword')}
                onChange={e => handleChange({ e, type: 'checkPassword' })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      className={cx({ active: values.checkPassword.show })}
                      onClick={() => handleClick({ type: 'eyeIcon', name: 'checkPassword' })}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <VisibleEyes show={values.checkPassword.show} />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info checkPassword`)}>
                <span className={cx(`input__info_text`, { active: isRegCheckPass === false })}>
                  * Passwords don’t match. Please confirm it
                </span>
              </div>
            </Grid>
            {/* // end Contianer */}
          </Grid>
        </form>
        <div className="changePass__btn_box">
          <button className="changePass__btn cancel" onClick={onClick}>
            Cancel
          </button>
          <button className="changePass__btn ok" onClick={handleSubmit}>
            Reset
          </button>
        </div>
      </Styled.ChangePasswordForm>
    </>
  );
}

const Styled = {
  ChangePasswordForm: styled.div`
    /* width: 600px; */
    padding: 40px 90px 35px;
    /* padding: 0 55px; */
    & {
      .MuiButtonBase-root:not(.MuiCheckbox-root),
      .MuiInputBase-root {
        ${fontFamily};
        height: 40px;
        box-shadow: none;
        &.px_0 {
          padding-left: 0;
          padding-right: 0;
        }
      }
      .MuiFormControl-root,
      .MuiTextField-root {
        width: 100%;
      }
      .MuiOutlinedInput-notchedOutline {
        border-color: #bbb;
      }
      .MuiInputBase-root.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
          border-width: 1px;
        }
      }
      .MuiSelect-outlined {
        border-radius: 5px;
      }
      .MuiSelect-select:focus {
        background-color: transparent;
      }
      .MuiIconButton-edgeEnd {
        &.active {
          color: ${color.blue};
        }
      }
      .MuiRadio-colorPrimary.Mui-checked,
      .MuiCheckbox-colorPrimary.Mui-checked {
        color: ${color.blue};
      }
      .MuiButton-containedPrimary {
        background-color: ${color.blue};
        &:hover {
          background-color: ${color.blue_hover};
        }
      }
      ${muiOutlinedInputFocus()}
      ${muiOutlinedInputError()}
      /* end mui reset */

      .changePass__title {
        margin-bottom: 35px;
        ${font(18, '#333')};
        text-align: center;
        font-weight: 700;
        letter-spacing: -0.3px;
      }
      .input__placeholder input::placeholder,
      .input__placeholder::placeholder {
        font-size: 14px;
        color: #bbb;
      }
      .input__info {
        padding: 5px 0;
        display: block;
        line-height: 1.1;
        font-size: 14px;
        .input__info_text {
          transition: 0.3s;
          opacity: 0;
          ${font(12, color.red)};
          &.active {
            opacity: 1;
          }
        }
      }
      .input__label {
        position: relative;
        display: block;
        ${font(14, color.gray_text)};
        text-transform: uppercase;
        line-height: 1.5;
        .input__label_icon.necessary {
          font-family: sans-serif;
          font-weight: 700;
          color: ${color.red};
        }
      }
      .input__box {
        position: relative;
        .input__icon_success {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
          transform: rotate(-45deg);
          margin-top: -6px;
          display: block;
          width: 13px;
          height: 8px;
          border: 2px solid transparent;
          border-left-color: ${color.blue};
          border-bottom-color: ${color.blue};
        }
      }
      .changePass__btn_box {
        margin-top: 20px;
        text-align: center;
      }
      .changePass__btn {
        ${buttonBlue};
        padding: 0;
        font-size: 16px;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        /* font-weight: 700; */
        &:not(:first-child) {
          margin-left: 5px;
        }
        &.cancel {
          background-color: #fff;
          border: 1px solid ${color.blue};
          color: ${color.blue};
        }
      }
    }
  `,
};

export default ModalPasswordChange;
