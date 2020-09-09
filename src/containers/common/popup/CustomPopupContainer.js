import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import uuid from 'react-uuid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useSelector } from 'react-redux';
import { Actions } from 'store/actionCreators';
import { PlainModal, ModalComplete, ModalConfirm } from 'components/common/modal';
import { identity, parseStringToDotNotation } from 'lib/library';
import { makeStyles } from '@material-ui/core/styles';
import { customPopup } from 'lib/utils';
import { buttonBlue, buttonWhite, font, color } from 'styles/__utils';
import { Link } from 'react-router-dom';
import { EscapeConvert } from 'components/base/helpers/convert';
/**
 *
 * @param {*} props
 */

const modalUuid = uuid().split('-').join('');
const convertEscape = text => <EscapeConvert prev={'\n'} next={<br />} content={text} />;

function CustomPopupContainer(props) {
  const { base } = useSelector(identity);
  const popupConfig = base?.customPopup || {};
  const {
    content = '',
    title = '',
    isOpen = false,
    onClick = null,
    onCancel = null,
    width = 360,
    type = 'alert',
    dim = {
      clickClose: true,
      isOpen: true,
    },
    hideButton = false,
    align = [],
    onExited = null,
  } = popupConfig;

  // console.log(popupConfig.align, 'popupConfig');

  const alignConfig = {
    title: 'center',
    content: 'center',
    button: 'center',
  };

  popupConfig.align.map(i => {
    const splitItem = i.split('.');
    const headItem = _.head(splitItem);
    const lastItem = _.last(splitItem);
    if (alignConfig[headItem]) {
      alignConfig[headItem] = lastItem;
    }
  });

  const handleCloseDim = dim?.clickClose === false ? null : () => customPopup({ type: 'dim' });

  const handleClick = config => {
    const { e, type } = config;

    if (type === 'ok') {
      customPopup({ type: 'dim' });
      if (!!onClick) {
        onClick();
      }
    }
    if (type === 'cancel') {
      customPopup({ type: 'dim' });
      if (!!onCancel) {
        onCancel();
      }
    }
    if (type === 'exit') {
      if (!!onExited) onExited();
    }
  };

  const isTypeConifirm = type === 'confirm';
  return (
    <Styled.Modal>
      <Modal
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        data-modal-name={modalUuid}
        className={cx(modalUuid)}
        open={isOpen}
        onClose={handleCloseDim}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen} onExited={e => handleClick({ type: 'exit' })}>
          <div className={cx('glb-modal-body')} style={{ width: width }}>
            <div className="CustomPopup__title" style={{ textAlign: alignConfig.title }}>
              <Title title={title} />
            </div>
            <div className="CustomPopup__content" style={{ textAlign: alignConfig.content }}>
              <Content content={content} />
            </div>

            <div
              className={cx('CustomPopup__buttonBox', { hide: hideButton })}
              style={{ textAlign: alignConfig.button }}
            >
              <button
                className={cx('CustomPopup__modalBtn ok', { typeAlert: !isTypeConifirm })}
                onClick={e => handleClick({ e, type: 'ok' })}
              >
                OK
              </button>
              {isTypeConifirm && (
                <button
                  className="CustomPopup__modalBtn cancel"
                  onClick={e => handleClick({ e, type: 'cancel' })}
                >
                  CANCEL
                </button>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
      <Styled.GlobalStyle />
    </Styled.Modal>
  );
}

const Title = props => props?.title;
const Content = props => props?.content;
const modalStyle = css`
  .glb-modal-body {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px 30px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14),
      0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
  .CustomPopup__buttonBox {
    text-align: center;
    &.hide {
      display: none;
    }
  }
  .CustomPopup__modalBtn {
    &.ok {
      ${buttonBlue};
      margin-right: 5px;
      &.typeAlert {
        margin-right: 0;
      }
    }
    &.cancel {
      ${buttonWhite}
    }
  }
`;
const Styled = {
  Modal: styled.div``,
  GlobalStyle: createGlobalStyle`
    [data-modal-name="${modalUuid}"]{
      ${modalStyle}
    }
  `,
};

export default CustomPopupContainer;
