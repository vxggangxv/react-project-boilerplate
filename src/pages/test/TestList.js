import React from 'react';
import { useShallowSelector } from 'lib/utils';
import { useImmer } from 'use-immer';
import { AppTemplate } from 'components/base/template';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TEST_DATA_LIST_SAGA } from 'store/actions';

const TestListState = {
  data: null,
};

function TestList({ match }) {
  const [values, setValues] = useImmer(TestListState);
  const { testListData } = useShallowSelector(state => ({
    testListData: state.test.obj.list.data,
  }));

  // console.log(match, 'match');
  useEffect(() => {
    TEST_DATA_LIST_SAGA();
  }, []);

  const data = testListData?.slice(0, 10);

  const handleClick = config => {
    const { type = '' } = config;

    if (type === 'data') {
      TEST_DATA_LIST_SAGA();

      return;
    }
  };

  if (!data) return null;
  return (
    <AppTemplate title={'TestList'}>
      <br />
      <ul>
        {data?.map(item => (
          <li key={item.id}>
            {item.id} <Link to={`/test/detail/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      {/* <button onClick={() => handleClick({ type: 'data' })}>Request</button> */}
    </AppTemplate>
  );
}

export default TestList;
