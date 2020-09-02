import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorForm } from 'components/base/error';

function ServerErrorContainer(props) {
  const { resultStatus } = useSelector(state => ({
    resultStatus: state.base.resultStatus,
  }));

  useEffect(() => {
    if (resultStatus !== null) {
      // window.location.reload();
    }
  }, []);

  return (
    <>
      <ErrorForm code="500" text="ServerError" />
    </>
  );
}

export default ServerErrorContainer;
