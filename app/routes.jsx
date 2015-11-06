import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from 'containers/app-layout';
import Home from 'containers/home';
import Create from 'containers/create';
import Job from 'containers/job';
import NotFound from 'containers/not-found';

function requireAuth(nextState, replaceState) {
    console.log('auth is required');
}

function logout(nextState, replaceState) {
    console.log('logout');
}

export default (
    <Route path="/" component={AppLayout}>
        <IndexRoute component={Home} />
        <Route path="jobs/create" component={Create} />
        <Route path="jobs/:slug" component={Job} />
        <Route path="jobs/:slug/edit" component={Job} onEnter={requireAuth} />
        <Route path="jobs/:slug/preview" component={Job} />
        <Route path="logout" onEnter={logout} />
        <Route path="*" component={NotFound} />
    </Route>
);
