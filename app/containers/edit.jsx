import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { getJob, updateJob } from 'actions/job';
import JobEdit from 'components/job-edit';
import Loading from 'components/loading';

class Edit extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        dispatch(getJob(id));
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(updateJob(data));
    }

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }

        const props = {
            ...this.props,
            onSubmit: this.handleSubmit.bind(this)
        };

        return <JobEdit {...props} />;
    }
}

function jobSelector(state) {
    const { job } = state;
    return { ...job };
}

export default connect(jobSelector)(Edit);
