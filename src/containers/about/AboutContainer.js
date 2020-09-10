import React from 'react';
import { toast } from 'react-toastify';
import { Popup } from 'lib/utils';
import { useEffect } from 'react';
import { DispatchActions } from 'store/actionCreators';
import { T } from 'components/common/text';
import { withTranslation } from 'react-i18next';

function AboutContainer({ t }) {
  useEffect(() => {
    // DispatchActions.language_change('ko');
  }, []);

  const closeAfter7 = () => toast('Will close after 7s', { autoClose: false });
  const openPopup = () => {
    DispatchActions.base_popup({
      content: 'hellow',
      isOpen: true,
      onExited() {
        console.log('exit');
      },
    });
  };

  const n = { n: 5 };

  return (
    <>
      <button onClick={closeAfter7}>Close after 7 seconds</button>
      <button onClick={openPopup}>openPopup</button>
      <T>hello</T>
      <T>{t('n.selected', { n: 5 })}</T>
    </>
  );
}

export default withTranslation()(AboutContainer);
