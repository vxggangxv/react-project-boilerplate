import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled, { createGlobalStyle } from 'styled-components';
import cx from 'classnames';
import { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/**
 * 
 * const handleModalClick = ()=>{
    setValues(draft=>{
      draft.modal = !draft.modal;
    });
  }
 *  <PlainModal 
      isOpen={values.modal.isShow}
      content={<ModalLoginContent /> }
      onClick={handleModalClick}
      dim={false}
      width={200} // 있으면 지정 없으면 360
    />
 * @param {*} props 
 */
function PlainModal(props) {
  const {
    isOpen = false,
    content = '',
    children = '',
    type = null,
    dim = {},
    onClick = () => {},
    onExited = () => {},
    width = 0,
    isCloseIcon = false,
  } = props;

  const [open, setOpen] = React.useState(false);

  // NOTE: init set open(from PopupContainer)
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  let classes = PlainStyles({ width: width });

  const handleOpen = () => {
    onClick({ type: 'dim' });
    setOpen(false);
  };

  const handleCloseDim = dim?.clickClose === false ? null : handleOpen;

  const handleClick = config => {
    const { e, type } = config;

    if (type === 'exit') {
      onExited();
      return;
    }
  };

  return (
    <Styled.PlainModal data-component-name="PlainModal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseDim}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen} onExited={e => handleClick({ type: 'exit' })}>
          <div className={cx('plainModal__children', classes.paper)}>
            {isCloseIcon && (
              <IconButton
                aria-label="close modal"
                className="plainModal__close_btn"
                onClick={handleCloseDim}
              >
                <CloseIcon className="plainModal__close_icon" />
              </IconButton>
            )}
            {content || children}
          </div>
        </Fade>
      </Modal>
      <Styled.PlainModalGlobalStyle />
    </Styled.PlainModal>
  );
}

const PlainStyles = prop => {
  prop = prop || {};
  return makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      fontSize: 28,
      width: prop.width ? prop.width : 360,
      borderRadius: 2,
      outline: 'none',
    },
  }))();
};

const Styled = {
  PlainModalGlobalStyle: createGlobalStyle`
    #plainModalContent {
      .plainModal__children {
        position: relative;
        .plainModal__close_btn {  
          z-index: 1;
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
    }
  `,
  PlainModal: styled.div``,
};

export default PlainModal;
