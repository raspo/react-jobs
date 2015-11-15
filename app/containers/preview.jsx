import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { getJob } from 'actions/job';
import JobView from 'components/job-view';

class Preview extends Component {
    static propTypes = {
        job: PropTypes.object,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        dispatch(getJob(id));
    }

    render() {
        const props = {
            ...this.props.job,
            isPreview: true
        };

        return <JobView {...props} />;
    }
}

function jobSelector(state) {
    const { job } = state;
    return {
        job
    };
}

export default connect(jobSelector)(Preview);
