import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Actions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';

const CoreState = {
  visible: false,
};

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  // const base = useSelector(state => state);
  const { apiCalling } = useShallowSelector(state => ({
    apiCalling: state.app.apiCalling,
  }));
  const [values, setValues] = useImmer(CoreState);
  const valuesVisible = values.visible;

  const initialize = async () => {
    Actions.base_exit_landing();
  };

  useEffect(() => {
    initialize();
  }, []);

  // NOTE: api 호출에 따른 loading
  useDidUpdateEffect(() => {
    setValues(draft => {
      draft.visible = apiCalling;
    });
  }, [apiCalling]);

  return (
    <>
      <FullScreenLoading visible={valuesVisible} />
      <ErrorContainer />
      {/* Notifications */}
    </>
  );
}

// export default Core;

export default Core;
