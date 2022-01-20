import AppModal from 'components/common/modal/AppModal';
import PlainModal from 'components/common/modal/PlainModal';
import { useShallowSelector } from 'lib/utils';
import React, { Fragment } from 'react';
import { AppActions } from 'store/actionCreators';

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
  const { popups } = useShallowSelector(state => ({
    popups: state.app.popups,
  }));

  if (!popups.length) return null;
  return (
    <>
      {popups.map((item, index) => {
        // init props
        const { id } = item;
        const {
          isOpen = false,
          type = 'alert',
          // width = 350,
          width = 534,
          title = '',
          content = '',
          isTitleDefault = false,
          isContentDefault = false,
          button = '',
          hideButton = false,
          reverseButton = false,
          okText = '',
          okLink = '',
          cancelText = '',
          cancelLink = '',
          // key = '',
          align = [],
          dim = true,
          paddingNone = false,
          hideBackdrop = false,
          onClick = () => {},
          onCancel = () => {},
          onExited = () => {},
        } = item.config;

        return (
          <Fragment key={index}>
            <PlainModal
              isOpen={isOpen}
              onClick={() => AppActions.remove_popup_delay({ id, isOpen: false })}
              onExited={onExited}
              dim={dim}
              width={width}
              hideBackdrop={hideBackdrop}
            >
              <AppModal
                type={type}
                title={title}
                content={content}
                isTitleDefault={isTitleDefault}
                isContentDefault={isContentDefault}
                button={button}
                hideButton={hideButton}
                reverseButton={reverseButton}
                okText={okText || 'Ok'}
                okLink={okLink}
                cancelText={cancelText || 'Cancel'}
                cancelLink={cancelLink}
                align={align}
                paddingNone={paddingNone}
                onClick={() => {
                  AppActions.remove_popup_delay({ id, isOpen: false });
                  onClick();
                }}
                onCancel={() => {
                  AppActions.remove_popup_delay({ id, isOpen: false });
                  onCancel();
                }}
              />
            </PlainModal>
          </Fragment>
        );
      })}
    </>
  );
}

export default PopupContainer;
