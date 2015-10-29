import _ from 'lodash';
import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { stringScore } from '../utils';
import { requestJobs, setFilter } from '../actions/jobs';
import Filter from '../components/filter';
import JobList from '../components/job-list';

function filterJobs(jobs, filter) {
    if (!filter) { return jobs; }

    const scores = _.sortBy(_.reduce(jobs, (result, job, index) => {
        let score = stringScore(job.title, filter);
        score += stringScore(job.company, filter);
        score += stringScore(job.address, filter);
        result.push({score, index});
        return result;
    }, []), 'score');

    return _.reduce(scores, (result, score) => {
        if (score.score > 0) {
            result.push(jobs[score.index]);
        }
        return result;
    }, []);
}

function mapStateToProps(state) {
    const { filter, jobs } = state;
    return {
        filter,
        isFetching: jobs.isFetching,
        filteredJobs: filterJobs(jobs.items, filter)
    };
}

@connect(mapStateToProps)
export default class Home extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        filteredJobs: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestJobs());
    }

    handleChange(nextFilter) {
        this.props.dispatch(setFilter(nextFilter));
    }

    render() {
        const { filter, isFetching, filteredJobs } = this.props;
        return (
            <div className="page">
                <header className="page-header ">
                    <main className="main">
                        <Filter value={filter} onChange={this.handleChange.bind(this)} />
                    </main>
                    <aside className="sidebar">
                        <Link className="button button-fluid" to="/jobs/create">Post new job</Link>
                    </aside>
                </header>
                <section className="page-content">
                    <main className="main">
                        {isFetching ? 'Is Fetching' : <JobList jobs={filteredJobs} />}
                    </main>
                    <aside className="sidebar">
                        blah blah
                    </aside>
                </section>
            </div>
        );
    }
}

