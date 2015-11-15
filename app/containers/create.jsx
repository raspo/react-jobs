import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { newJobForm, createJob } from 'actions/job';
import JobEdit from 'components/job-edit';

class Create extends Component {
    static propTypes = {
        job: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(newJobForm());
    }

    componentWillReceiveProps(newProps) {
        const { dispatch } = this.props;

        if (newProps.job && newProps.job.slug && !newProps.job.errors) {
            dispatch(pushState(null, `/jobs/${newProps.job.slug}/preview`));
        }
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(createJob(data));
    }

    render() {
        const props = {
            ...this.props.job,
            isNew: true,
            onSubmit: this.handleSubmit.bind(this)
        };

        return <JobEdit {...props} />;
    }
}

function newJobSelector(state) {
    const { job } = state;
    return {
        job: {
            slug: job.slug,
            errors: job.errors
        }
    };
}

export default connect(newJobSelector)(Create);
