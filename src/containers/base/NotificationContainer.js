import { useShallowSelector } from 'lib/utils';
import React, { useEffect } from 'react';
import { DispatchActions } from 'store/actionCreators';
import styled, { keyframes } from 'styled-components';

function NotificationContainer(props) {
  const { toasts } = useShallowSelector(state => ({
    toasts: state.app.toasts,
  }));

  // useEffect(() => {
  //   DispatchActions.show_toast(<>토스트등자앙!!</>);
  //   DispatchActions.show_toast('토스트 등장!!');
  //   DispatchActions.show_toast('토스트 등장!!');
  // }, []);

  if (!toasts.length) return null;
  return (
    <Styled.NotificationContainer data-component-name="NotificationContainer">
      {toasts.map((item, index) => (
        <div key={index} className="notification">
          {item.content}
        </div>
      ))}
    </Styled.NotificationContainer>
  );
}

const faseInOut = keyframes`
  0% {
    opacity: 0;
    right: -400px;
  }

  5% {
    right: 0px;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  95% {
    right: 0px;
  }

  100% {
    opacity: 0;
    right: -400px;
  }
`;

const Styled = {
  NotificationContainer: styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    .notification {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8 10px;
      width: 300px;
      padding: 20px;
      font-weight: 700;
      background-color: #fff;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);
      opacity: 0;
      right: -400px;
      animation: ${faseInOut} 4s linear alternate;
      &:not(:first-child) {
        margin-top: 15px;
      }
    }
    .notification__icon_alert {
      margin-right: 5px;
    }
  `,
};

export default NotificationContainer;
