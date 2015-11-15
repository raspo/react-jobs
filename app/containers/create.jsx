import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { createJob } from 'actions/job';
import JobEdit from 'components/job-edit';

class Create extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(createJob(data));
    }

    render() {
        const props = {
            ...this.props,
            isNew: true,
            onSubmit: this.handleSubmit.bind(this)
        };

        return <JobEdit {...props} />;
    }
}

function newJobSelector(state) {
    const { job } = state;
    return {
        errors: job.errors
    };
}

export default connect(newJobSelector)(Create);
