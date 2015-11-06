import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import JobView from 'components/job-view';

class Preview extends Component {
    static propTypes = {
        job: PropTypes.object,
        isPublished: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        dispatch(getJob(id));
    }

    // componentDidMount() {
    //     const { job, dispatch } = this.props;
    //     if (job === null) {
    //         dispatch(pushState(null, '/'));
    //     }
    // }

    // componentWillUnMount() {
    //     const { dispatch } = this.props;
    //     dispatch(unsetPreview());
    // }

    render() {
        const { job } = this.props;
        return job ? <JobView {...job} /> : null;
    }
}

function jobSelector(state) {
    const { job } = state;
    return { job };
}

export default connect(jobSelector)(Preview);
