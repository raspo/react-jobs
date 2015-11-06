import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { getJob } from 'actions/job';
import JobView from 'components/job-view';

class Job extends Component {
    static propTypes = {
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        dispatch(getJob(id));
    }

    componentWillReceiveProps(newProps) {
        const { dispatch } = this.props;
        if (!newProps.isFetching && !newProps.publishedAt) {
            dispatch(pushState(null, '/'));
        }
    }

    render() {
        return <JobView {...this.props} />;
    }
}

function jobSelector(state) {
    const { job } = state;
    return { ...job };
}

export default connect(jobSelector)(Job);
