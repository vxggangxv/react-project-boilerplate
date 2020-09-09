import React from 'react';
import { toast } from 'react-toastify';
import { Popup } from 'lib/utils';
import { useEffect } from 'react';
import { DispatchActions } from 'store/actionCreators';

function AboutContainer(props) {
  const closeAfter7 = () => toast('Will close after 7s', { autoClose: false });
  const openPopup = () => {
    console.log('work');
    DispatchActions.base_popup({
      // type: 'alert',
      // type: 'confirm',
      content: 'hellow',
      isOpen: true,
      onExited() {
        console.log('exit');
      },
    });
    console.log('work end');
  };

  return (
    <>
      <button onClick={closeAfter7}>Close after 7 seconds</button>
      <button onClick={openPopup}>openPopup</button>
    </>
  );
}

export default AboutContainer;
