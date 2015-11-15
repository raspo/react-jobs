import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { prepareNewJob, createNewJob } from 'actions/job';
import JobEdit from 'components/job-edit';

class Create extends Component {
    static propTypes = {
        job: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(prepareNewJob());
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(createNewJob(data));
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
            errors: job.errors
        }
    };
}

export default connect(newJobSelector)(Create);
