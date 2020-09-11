import React from 'react';
import { toast } from 'react-toastify';
import { Popup } from 'lib/utils';
import { useEffect } from 'react';
import { DispatchActions } from 'store/actionCreators';
import { T } from 'components/common/text';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

function AboutContainer() {
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
    <Styled.AboutContainer>
      <button onClick={closeAfter7}>Close after 7 seconds</button>
      <button onClick={openPopup}>openPopup</button>
      <T>hello</T>
      <div className="scroll__box">
        <div className="scroll__content">
          {[...Array(200).keys()].map((item, idx) => (
            <p key={idx}>하이</p>
          ))}
        </div>
      </div>
    </Styled.AboutContainer>
  );
}

const Styled = {
  AboutContainer: styled.div`
    .scroll__box {
      height: 300px;
      overflow-y: auto;
      /* border: 1px solid #000; */
      .scroll__content {
      }
    }
  `,
};

export default AboutContainer;
