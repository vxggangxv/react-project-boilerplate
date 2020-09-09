import React, { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Actions } from 'store/actionCreators';
import { PlainModal, ModalComplete, ModalConfirm } from 'components/common/modal';
import { identity } from 'lib/library';
import { useShallowSelector } from 'lib/utils';

// basePopup.isOpen
// basePopup.type
// basePopup.key
// basePopup.dim
// basePopup.onClick
// basePopup.onCancel

/**
 *
 * @param {*} props
 */
function PopupContainer() {
  const { popup: basePopup } = useShallowSelector(state => ({
    popup: state.base.popup,
  }));

  // console.log('--------------------- render page ---------------------');
  const typeConfig = {
    alert: Alert,
    confirm: Confirm,
  };

  const Component = typeConfig[basePopup.type];
  return <>{Component && <Component popupConfig={basePopup} />}</>;
}

export default PopupContainer;

const Alert = React.memo(
  function Alert(props) {
    const { popupConfig = {} } = props;
    // console.log(popupConfig.content.value, 'popupConfig.content.value');
    // console.log(popupConfig, 'popupConfig\n\n\n\n');
    return (
      <>
        <PlainModal
          isOpen={popupConfig.isOpen}
          content={
            <ModalComplete
              title={popupConfig.title}
              content={popupConfig.content}
              button={popupConfig.button}
              hideButton={popupConfig.hideButton}
              reverseButton={popupConfig.reverseButton}
              okText={popupConfig.okText}
              okLink={popupConfig.okLink}
              cancelLink={popupConfig.cancelLink}
              align={popupConfig.align}
              paddingNone={popupConfig.paddingNone}
              onClick={() => {
                Actions.base_popup({ type: 'dim' });
                if (!!popupConfig.onClick) {
                  popupConfig.onClick();
                }
              }}
            />
          }
          onClick={() => Actions.base_popup({ type: 'dim' })}
          onExited={popupConfig.onExited}
          dim={popupConfig.dim}
          width={popupConfig.width}
        />
      </>
    );
  },
  (prevProp, nextProp) => {
    // console.log(prevProp, nextProp);
    return false;
  },
);

function Confirm(props) {
  const { popupConfig } = props;
  return (
    <>
      <PlainModal
        isOpen={popupConfig.isOpen}
        content={
          <ModalConfirm
            title={popupConfig.title}
            content={popupConfig.content}
            button={popupConfig.button}
            hideButton={popupConfig.hideButton}
            okText={popupConfig.okText}
            okLink={popupConfig.okLink}
            cancelLink={popupConfig.cancelLink}
            align={popupConfig.align}
            paddingNone={popupConfig.paddingNone}
            onClick={() => {
              Actions.base_popup({ type: 'dim' });
              if (!!popupConfig.onClick) {
                popupConfig.onClick();
              }
            }}
            onCancel={() => {
              Actions.base_popup({ type: 'dim' });
              if (!!popupConfig.onCancel) {
                popupConfig.onCancel();
              }
            }}
          />
        }
        onClick={() => Actions.base_popup({ type: 'dim' })}
        onExited={popupConfig.onExited}
        dim={popupConfig.dim}
        width={popupConfig.width}
      />
    </>
  );
}
