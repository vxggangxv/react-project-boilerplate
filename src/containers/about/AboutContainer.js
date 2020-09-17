import React from 'react';
import { toast } from 'react-toastify';
import { Popup } from 'lib/utils';
import { useEffect } from 'react';
import { DispatchActions } from 'store/actionCreators';
import { T } from 'components/common/text';
import { Translation, withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomInfiniteScroll } from 'components/common/scroll';
import { useImmer } from 'use-immer';
import InfiniteScroll from 'react-infinite-scroll-component';

const AboutContainerState = {
  loading: false,
  items: Array.from({ length: 20 }),
};

function AboutContainer() {
  const [values, setValues] = useImmer(AboutContainerState);
  const loading = values.loading;
  const items = values.items;

  useEffect(() => {
    // DispatchActions.language_change('ko');
  }, []);

  const closeAfter7 = () => toast('Will close after 7s', { autoClose: false });
  const openPopup = () => {
    Popup({
      content: 'hellow',
      isOpen: true,
      onExited() {
        console.log('exit');
      },
    });
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setValues(draft => {
      draft.loading = true;
    });
    setTimeout(() => {
      setValues(draft => {
        draft.items = items.concat(Array.from({ length: 20 }));
        draft.loading = false;
      });
    }, 1500);
  };

  const languageChange = () => {
    // DispatchActions.language_change('KO');
    DispatchActions.language_change('en');
    // DispatchActions.language_change('ko');
  };

  return (
    <Styled.AboutContainer>
      <button onClick={closeAfter7}>Close after 7 seconds</button>
      <button onClick={openPopup}>openPopup</button>
      <button onClick={languageChange}>언어변경</button>
      <div className="scroll__box">
        <InfiniteScroll
          className="scroll__content"
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={200}
        >
          {items.map((item, idx) => (
            <div key={idx}>div - ${idx}</div>
          ))}
        </InfiniteScroll>
      </div>
      <T lang="en">hello</T>
      <Translation>{t => <p>{t('hello')}</p>}</Translation>

      {/* <CustomInfiniteScroll
        maxDataLength={200}
        dataLength={items.length}
        next={fetchMoreData}
        unMount={null}
        height={200}
      >
        {items.map((item, idx) => (
          <div key={idx}>div - ${idx}</div>
        ))}
      </CustomInfiniteScroll> */}
    </Styled.AboutContainer>
  );
}

const Styled = {
  AboutContainer: styled.div`
    .scroll__box {
      margin-top: 10px;
      /* height: 200px;
      overflow-y: auto; */
      /* border: 1px solid #000; */
      .scroll__content {
      }
    }
  `,
};

export default AboutContainer;
