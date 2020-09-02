import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { BASE_TEST_SAGAS } from 'store/actions';
import { useShallowSelector } from 'lib/utils';
import { Actions } from 'store/actionCreators';

const MainHomeContainer = () => {
  const { landing, apiCalling, resultStatus } = useShallowSelector(state => ({
    landing: state.base.landing,
    apiCalling: state.app.apiCalling,
    resultStatus: state.base.resultStatus,
  }));

  // console.log(landing, 'landing');
  // return <div>{landing === false ? 'loading...' : <Test />}</div>;
  return <Test />;
};

const TestState = {
  data: null,
};

function Test() {
  const [values, setValues] = useImmer(TestState);

  const handleClick = config => {
    const { type } = config;
    if (type === 'data') {
      BASE_TEST_SAGAS();
    }
  };

  return (
    <>
      {/* <section>
        <h2>Online Dof Brdige Servive</h2>
      </section>
      <section>
        <h3>Amazing Bidding System Dental Design Open Platform</h3>
      </section>
      <section>
        <h3>Who am I?</h3>
      </section>
      <section>
        <h3>AnyTime, AnyWhere</h3>
      </section>
      <section>Slide2</section> */}

      <button onClick={() => handleClick({ type: 'data' })}>Click</button>
      {/* <h2>{values.data?.title}</h2> */}
    </>
  );
}
export default MainHomeContainer;
