import React, { useEffect } from 'react';
import { TEST_DATA_SAGA } from 'store/actions';
import { useShallowSelector } from 'lib/utils';
import { useImmer } from 'use-immer';
import { AppTemplate } from 'components/base/template';

const TestDetailState = {
  data: null,
};

function TestDetail({ match }) {
  const id = Number(match.params.id);
  const { testDetailData, testDetailPending } = useShallowSelector(state => ({
    testDetailData: state.test.obj.detail.data,
    testDetailPending: state.test.obj.detail.pending,
  }));

  useEffect(() => {
    TEST_DATA_SAGA(id);
  }, []);

  // NOTE: 기존 데이터를 보여줘도 되는 경우
  // if (!testDetailData) return null;
  // NOTE: 기존 데이터를 보여주기 싫은 경우
  if (!testDetailData || testDetailPending) return null;
  return (
    <AppTemplate title={'TestDetail'}>
      <br />
      {testDetailData.id}, {testDetailData.title}
    </AppTemplate>
  );
}

export default TestDetail;
