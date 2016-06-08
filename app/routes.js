import React from 'react';
import Main from './components/main/Main';
import Index from './components/index/';
import Topic from './components/topic/';
import Warehouse from './components/warehouse/';
import Error from './components/error/';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Warehouse}>
    <IndexRoute component={Warehouse} />
    <Route path="404" component={Error} />
    <Route path="list/:id(/:page)" component={Topic} />
     <Route path="warehouse(/:gitusername)(/:gitreponame)(/:pageid)" component={Warehouse} />
    <Route path="*" component={Error} />
  </Route>
);
