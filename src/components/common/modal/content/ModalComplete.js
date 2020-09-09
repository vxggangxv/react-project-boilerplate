import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
// import uuid from 'react-uuid';
import _ from 'lodash';
import { buttonBlue, font, color } from 'styles/__utils';
import { Link } from 'react-router-dom';
import { EscapeConvert } from 'components/base/helpers/convert';
import { icon_modal_alert } from 'components/base/images';
import { useImmer } from 'use-immer';

// const modalUuid = uuid().split('-').join('');
const convertEscape = text => <EscapeConvert prev={'\n'} next={<br />} content={text} />;

const contentTypeCheck = (data, text = '') => {
  // const hasData = !!data;
  const conditionConfig = {
    value: '',
    isTypeString: false,
  };

  // NOTE: 데이터 없을 경우 에러 처리
  if (data) {
    conditionConfig.value = data;
  }

  // NOTE: string 처리
  if (data && typeof data === 'string') {
    conditionConfig.value = convertEscape(data);
    conditionConfig.isTypeString = true;
  }

  return conditionConfig;
};

const ModalCompleteState = {
  loading: null,
};

function ModalComplete(props) {
  const {
    title = {},
    content = {},
    button = {},
    hideButton = null,
    onClick = () => {},
    onCancel = () => {},
    align = [],
    okText = '',
    okLink = '',
    paddingNone = null,
  } = props;

  const [values, setValues] = useImmer(ModalCompleteState);
  const modalRef = useRef(null);
  const valuesLoading = values.loading;

  useLayoutEffect(() => {
    setValues(draft => {
      draft.loading = false;
    });
  }, []);

  const alignConfig = {
    title: '',
    content: '',
    button: '',
  };

  align.map(i => {
    const splitItem = i.split('.');
    const headItem = _.head(splitItem);
    const lastItem = _.last(splitItem);
    alignConfig[headItem] = lastItem;
  });

  const titleObj = contentTypeCheck(title);
  const contentObj = contentTypeCheck(content);
  const Title = () => titleObj.value;
  const Content = () => contentObj.value;
  const Button = () => button;

  let propOkText = 'OK';
  if (okText) {
    propOkText = okText;
  }

  return (
    <>
      {valuesLoading ? (
        ''
      ) : (
        <Styled.ModalComplete
          ref={modalRef}
          className={cx({ modal__container_padding_none: paddingNone })}
        >
          <div className="modal__header">
            <div
              className={cx('modal__title', { default: titleObj?.isTypeString })}
              style={{ textAlign: alignConfig.title }}
              // ref={refTitle}
            >
              <Title />
            </div>
          </div>

          <div className="modal__body">
            <div
              className={cx('modal__content', {
                default: contentObj?.isTypeString && !paddingNone,
              })}
              style={{ textAlign: alignConfig.content }}
            >
              {/* {content} */}
              <Content />
            </div>
          </div>

          <div className="modal__footer" hidden={hideButton}>
            <div
              className={cx('modal__btn_box', { default: !button })}
              style={{ textAlign: alignConfig.button || 'right' }}
            >
              {button ? (
                <Button />
              ) : (
                <>
                  {okLink ? (
                    <Link to={okLink}>
                      <button className="modal__btn ok" onClick={onClick}>
                        {propOkText}
                      </button>
                    </Link>
                  ) : (
                    <button className="modal__btn ok" onClick={onClick}>
                      {propOkText}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </Styled.ModalComplete>
      )}
    </>
  );
}
const Styled = {
  ModalComplete: styled.div`
    /* text-align: left; */
    padding: 40px 35px 30px 35px;
    &.modal__container_padding_none {
      padding: 0;
    }
    & {
      .modal__header {
        .modal__title.default {
          position: relative;
          ${font(18, color.black_font)};
          font-weight: bold;
          /* margin: 40px 35px 0px 40px; */
          padding-left: 30px;
          margin-bottom: 15px;
          text-align: left;
          &:before {
            content: '';
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
            margin-top: -1px;
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url(${icon_modal_alert}) no-repeat 0 center;
          }
        }
      }
      .modal__body {
        .modal__content.default {
          /* margin: 0px 35px 0px 40px; */
          margin-bottom: 20px;
          padding-left: 32px;
          ${font(15, color.gray_font)};
          text-align: left;
          line-height: 22px;
          word-break: break-all;
        }
      }
      .modal__footer {
        .modal__btn_box.default {
          /* margin: 0px 35px 30px 40px; */
          text-align: right;
          .modal__btn {
            ${buttonBlue};
            min-width: 80px;
            padding-left: 0;
            padding-right: 0;
            border-radius: 5px;
            font-weight: 700;
            &:not(:first-child) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  `,
};

export default ModalComplete;
