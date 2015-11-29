import _ from 'lodash';
import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { stringScore } from 'utils';
import { getJobs, setFilter } from 'actions/jobs';
import Filter from 'components/filter';
import JobList from 'components/job-list';
import Loading from 'components/loading';
import Icon from 'components/icon';

class Home extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        filteredJobs: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getJobs());
    }

    handleChange(nextFilter) {
        this.props.dispatch(setFilter(nextFilter));
    }

    render() {
        const { filter, isFetching, filteredJobs } = this.props;
        const isFiltered = !!filter;
        return (
            <DocumentTitle title="React.js Jobs">
                <div className="page">
                    <header className="page-header ">
                        <main className="main">
                            <Filter value={filter} onChange={this.handleChange.bind(this)} />
                        </main>
                        <aside className="sidebar">
                            <Link className="button button-fluid" to="/jobs/new">Post a job</Link>
                        </aside>
                    </header>
                    <section className="page-content">
                        <main className="main">
                            {isFetching ? <Loading /> : <JobList jobs={filteredJobs} isFiltered={isFiltered} />}
                        </main>
                        <aside className="sidebar">
                            <p>React.js Jobs is the best place to post your React, Flux, Redux or Javascript ninja jobs.</p>
                            <p>Post your job today to find your perfect candidate.</p>

                            <ul className="links">
                                <li className="separator"></li>
                                <li>
                                    <a href="https://twitter.com/reactjs_jobs" target="_blank">
                                        <Icon name="twitter" /> Follow @reactjs_jobs
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}

function filterJobs(jobIds, jobsById, filter) {
    const jobs = _.map(jobIds, (jobId) => {
        return jobsById[jobId];
    });

    if (!filter) { return jobs; }

    const scores = _.sortBy(_.reduce(jobs, (result, job, index) => {
        let score = stringScore(job.title, filter);
        score += stringScore(job.companyName, filter);
        score += stringScore(job.address, filter);
        result.push({score, index});
        return result;
    }, []), 'score');

    return _.reduce(scores, (result, score) => {
        if (score.score > 0) {
            result.push(jobs[score.index]);
        }
        return result;
    }, []).reverse();
}

function homeSelector(state) {
    const { filter, jobs, jobsById, isFetchingJobs } = state;
    return {
        filter,
        isFetching: isFetchingJobs,
        filteredJobs: filterJobs(jobs, jobsById, filter)
    };
}

export default connect(homeSelector)(Home);
