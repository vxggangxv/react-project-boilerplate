import React from 'react';
import { Switch, Route } from 'react-router';
import { mapper } from 'lib/mapper';
// import { ServerErrorContainer } from 'containers/error';
import { NotFound } from 'components/base/error';

function ErrorPage(props) {
  return (
    <>
      <Switch>
        {/* <Route path={`${mapper.pageUrl.error.server}`} component={ServerErrorContainer} /> */}
        <Route path={`${mapper.pageUrl.error.notFound}`} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default ErrorPage;
