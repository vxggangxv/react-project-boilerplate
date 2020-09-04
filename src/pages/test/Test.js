import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TestList, TestDetail } from 'pages';
import { NotFound } from 'components/base/error';

function Test({ match }) {
  // NOTE: match.url 또는 mapper.pageUrl 설정후 path 연결
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={TestList} />
      <Route exact path={`${match.url}/:id`} component={TestDetail} />
      {/* <Route path={`${match.url}/`} component={() => <Redirect to="/test" />} /> */}
      {/* <Route path={`${match.url}/`} component={() => <div>해당값이 없습니다</div>} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Test;
