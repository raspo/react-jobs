import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { requestJobs } from '../actions/jobs';
import Filter from '../components/filter';
import JobList from '../components/job-list';

function mapStateToProps(state) {
    const { filter, jobs } = state;
    return {
        filter,
        isFetching: jobs.isFetching,
        jobs: jobs.items
    };
}

@connect(mapStateToProps)
export default class Home extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        jobs: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestJobs());
    }

    render() {
        return (
            <div className="page">
                <header className="page-header ">
                    <main className="main">
                        <Filter />
                    </main>
                    <aside className="sidebar">
                        <Link className="button button-fluid" to="/jobs/create">Post new job</Link>
                    </aside>
                </header>
                <section className="page-content">
                    <main className="main">
                        {this.props.isFetching ? 'Is Fetching' : <JobList jobs={this.props.jobs} />}
                    </main>
                    <aside className="sidebar">
                        blah blah
                    </aside>
                </section>
            </div>
        );
    }
}

