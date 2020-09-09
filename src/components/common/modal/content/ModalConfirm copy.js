import React from 'react';
import styled from 'styled-components';
import { buttonBlue, font, color } from 'styles/__utils';
import { Link } from 'react-router-dom';
import { EscapeConvert } from 'components/base/helpers/convert';

function convertEscape(text) {
  return <EscapeConvert prev={'\n'} next={<br />} content={text} />;
}

function ModalConfirm(props) {
  const { children, okLink, cancelLink, title } = props;
  const infoText = children ? convertEscape(children) : '완료되었습니다.';
  const titleText = title ? convertEscape(title) : '완료!';

  return (
    <Styled.ModalComplete>
      <h1 className="title">{titleText}</h1>
      <p className="info">{infoText}</p>
      {okLink ? (
        <Link to={okLink}>
          <button className="btn" onClick={props.onClick}>
            OK
          </button>
        </Link>
      ) : (
        <button className="btn" onClick={props.onClick}>
          OK
        </button>
      )}

      {cancelLink ? (
        <Link to={cancelLink}>
          <button className="btn cancel last" onClick={props.onCancel}>
            CANCEL
          </button>
        </Link>
      ) : (
        <button className="btn cancel last" onClick={props.onCancel}>
          CANCEL
        </button>
      )}
    </Styled.ModalComplete>
  );
}
const Styled = {
  ModalComplete: styled.div`
    text-align: center;
    padding: 50px 30px 30px 30px;
    .title {
      ${font(28, color.black_font)};
      font-weight: bold;
      margin-bottom: 22px;
    }
    .info {
      ${font(16, color.gray_font)};
      margin-bottom: 30px;
      line-height: 22px;
    }
    .btn {
      ${buttonBlue};
      min-width: 100px;
      margin-right: 5px;
      &.last {
        margin-right: 0;
      }
      &.cancel {
        background: white;
        border: 1px solid ${color.blue};
        color: ${color.blue};
      }
    }
  `,
};

export default ModalConfirm;
