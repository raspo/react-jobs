import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { simpleDate } from '../utils';

export default class JobList extends Component {
    static propTypes = {
        jobs: PropTypes.array.isRequired
    }

    renderJob(job) {
        const jobUrl = `/jobs/${job.id}`;
        const logoURI = job.logo || '/img/company-logo.png';

        return (
            <li key={job.id} className="job-list-item">
                <Link to={jobUrl}>
                    <img src={logoURI} alt={job.company} className="job-list-item-logo" />
                    <h2 className="job-list-item-title">{job.title}</h2>
                    <h3 className="job-list-item-company">{job.company}</h3>
                    <div className="job-list-item-meta">
                        <time>{simpleDate(job.created)}</time>
                        <address>{job.address}</address>
                    </div>
                </Link>
            </li>
        );
    }

    render() {
        const { jobs } = this.props;

        if (jobs.length === 0) {
            return <div>No results found</div>;
        }

        return (
            <ul className="job-list">
                { jobs.map(job => this.renderJob(job)) }
            </ul>
        );
    }
}
