import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { getJob } from 'actions/job';
import JobView from 'components/job-view';

class Job extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        dispatch(getJob(routeParams.id));
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
