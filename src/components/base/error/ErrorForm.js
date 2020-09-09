import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ErrorForm(props) {
  const { code = '404', text = 'Not Found', infoHide = false } = props;

  return (
    <Styled.ErrorForm data-component-name="ErrorForm">
      <div className="error__container">
        <p className="error__title">
          <span className="error__code">{code}</span>
          {!infoHide && <br />}
          <span className={cx('error__text', { infoHide: infoHide })}>{text}</span>
        </p>
        {!infoHide && (
          <p className="error__content">
            Oops, something went wrong.
            <br />
            <br />
            The server encountered an internal error or misconfiguration and was unable to complete
            your request.
          </p>
        )}
        <div className="error__link_box">
          <Link to="/" className="error__link">
            Home
          </Link>
        </div>
      </div>
    </Styled.ErrorForm>
  );
}

const Styled = {
  ErrorForm: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    & {
      .error__container {
        width: 460px;
        color: #767675;
      }
      .error__title,
      .error__link_box {
        text-align: left;
      }
      .error__title {
        margin-top: -50px;
        font-weight: 700;
        .error__code {
          font-size: 75px;
          color: #bbb;
        }
        .error__text {
          font-size: 45px;
          color: #d2567e;
          &.infoHide {
            margin-left: 10px;
          }
        }
      }
      .error__content {
        margin-top: 30px;
      }
      .error__link_box {
        margin-top: 10px;
        .error__link {
          margin-left: 3px;
          text-decoration: underline;
        }
      }
    }
  `,
};

export default ErrorForm;
