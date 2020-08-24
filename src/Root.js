import React, { useEffect } from 'react';
import App from './components/App';

// import CustomProvider from '';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

function Root(props) {
  return (
    <Router>
      {/* <CustomProvider connectStore={store} configure={configure}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </CustomProvider> */}
    </Router>
  );
}

export default Root;


// export const configure = () =>{

//   sagaBind.run(connectStore,NotificationContainer,PopupContainer,ErrorContainer)
// }
// //  ContextAPI // 독립적인 리듀서
// function CustomProvider(props){ 
//   const {store,sagaBind} = props;
//   //특정값이 옵저버블하게 배교해서


//   useEffect(()=>{
//     // ContextAPI 요청, 컨텍스를 생성
//     // 
//   },[store.base.popup])

//   return <>
//     {...sagaBind}
//   </>;
// } //=> saga연결 작업 (컨텍스트 APi와 외부 상태관리 모듈의 연결)