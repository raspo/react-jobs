import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { getJob } from 'actions/job';
import JobView from 'components/job-view';

class Preview extends Component {
    static propTypes = {
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        this.ensureAuthorization(this.props);
        dispatch(getJob(id));
    }

    componentWillReceiveProps(newProps) {
        this.ensureAuthorization(newProps);
    }

    ensureAuthorization(props) {
        const { dispatch } = this.props;
        if (props.publishedAt) {
            dispatch(replaceState(null, '/'));
        }
    }

    render() {
        const props = {
            ...this.props,
            isPreview: true
        };

        return <JobView {...props} />;
    }
}

function jobSelector(state) {
    const { job } = state;
    return { ...job };
}

export default connect(jobSelector)(Preview);
