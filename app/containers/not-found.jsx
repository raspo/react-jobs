import _ from 'lodash';
import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { getJobs } from 'actions/jobs';
import JobList from 'components/job-list';
import Loading from 'components/loading';

class NotFound extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        jobsList: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getJobs());
    }

    render() {
        const { isFetching, jobsList } = this.props;
        return (
            <DocumentTitle title="React Jobs - Page not found">
                <div className="page">
                    <header className="page-header">
                        <h2 className="page-header-title">404 - Page not found</h2>
                    </header>
                    <section className="page-content">
                        <main className="main">
                            {isFetching ? <Loading /> : <JobList jobs={jobsList} />}
                        </main>
                        <aside className="sidebar">

                        </aside>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}

function jobsSelector(state) {
    const { filter, jobs, jobsById, isFetchingJobs } = state;

    const jobsList = _.map(jobs, (jobId) => {
        return jobsById[jobId];
    });

    return {
        filter,
        isFetching: isFetchingJobs,
        jobsList: jobsList
    };
}

export default connect(jobsSelector)(NotFound);
