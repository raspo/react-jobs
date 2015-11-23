import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from 'containers/app-layout';
import Home from 'containers/home';
import Create from 'containers/create';
import Job from 'containers/job';
import Edit from 'containers/edit';
import Preview from 'containers/preview';
import Payment from 'containers/payment';
import Guarantee from 'components/guarantee';
import Contact from 'components/contact';
import NotFound from 'containers/not-found';

export default (
    <Route path="/" component={AppLayout}>
        <IndexRoute component={Home} />
        <Route path="jobs/new" component={Create} />
        <Route path="jobs/:slug" component={Job} />
        <Route path="jobs/:slug/edit" component={Edit} />
        <Route path="jobs/:slug/preview" component={Preview} />
        <Route path="jobs/:slug/payment" component={Payment} />
        <Route path="guarantee" component={Guarantee} />
        <Route path="contact" component={Contact} />
        <Route path="*" component={NotFound} />
    </Route>
);
