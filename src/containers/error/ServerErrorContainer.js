import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorForm } from 'components/base/error';

function ServerErrorContainer(props) {
  const { responseStatus } = useSelector(state => ({
    responseStatus: state.base.responseStatus,
  }));

  useEffect(() => {
    if (responseStatus !== null) {
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
