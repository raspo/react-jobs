import '../less/app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import history from './history';

import AppLayout from './containers/app-layout';
import Home from './containers/home';
import Create from './containers/create';
import Job from './containers/job';
import NotFound from './containers/not-found';

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={AppLayout}>
            <IndexRoute component={Home} />
            <Route path="jobs/create" component={Create} />
            <Route path="jobs/:id" component={Job} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>,
    document.getElementById('app')
);
