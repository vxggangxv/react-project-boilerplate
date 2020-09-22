import React, { useMemo } from 'react';
import { DispatchActions } from 'store/actionCreators';
import { PlainModal, AppModal } from 'components/common/modal';
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
  const { popupConfig } = useShallowSelector(state => ({
    popupConfig: state.base.popup,
  }));

  return (
    <>
      <PlainModal
        isOpen={popupConfig.isOpen}
        onClick={() => DispatchActions.base_popup({ type: 'dim' })}
        onExited={popupConfig.onExited}
        dim={popupConfig.dim}
        width={popupConfig.width}
      >
        <AppModal
          type={popupConfig.type}
          title={popupConfig.title}
          content={popupConfig.content}
          isTitleDefault={popupConfig.isTitleDefault}
          isContentDefault={popupConfig.isContentDefault}
          button={popupConfig.button}
          hideButton={popupConfig.hideButton}
          reverseButton={popupConfig.reverseButton}
          okText={popupConfig.okText || 'Ok'}
          okLink={popupConfig.okLink}
          cancelLink={popupConfig.cancelLink}
          align={popupConfig.align}
          paddingNone={popupConfig.paddingNone}
          onClick={() => {
            DispatchActions.base_popup({ type: 'dim' });
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
      </PlainModal>
    </>
  );
}

export default PopupContainer;
