import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { simpleDate } from '../utils';

export default class JobList extends Component {
    static propTypes = {
        jobs: PropTypes.array.isRequired,
        isFiltered: PropTypes.bool.isRequired
    }

    renderJob(job) {
        const { id, title, companyName, companyLogo, address, created } = job;
        const jobUrl = `/jobs/${id}`;
        const logoURI = companyLogo || '/img/company-logo.png';

        return (
            <li key={id} className="job-list-item">
                <Link to={jobUrl}>
                    <img src={logoURI} alt={companyName} className="job-list-item-logo" />
                    <h2 className="job-list-item-title">{title}</h2>
                    <h3 className="job-list-item-company">{companyName}</h3>
                    <div className="job-list-item-meta">
                        <time>{simpleDate(created)}</time>
                        <address>{address}</address>
                    </div>
                </Link>
            </li>
        );
    }

    render() {
        const { jobs, isFiltered } = this.props;

        if (jobs.length === 0) {
            if (isFiltered) {
                return <div className="no-results">No listings match your search criteria.</div>;
            }

            return <div className="no-results">There are no job listings at this time.</div>;
        }

        return (
            <ul className="job-list">
                { jobs.map(job => this.renderJob(job)) }
            </ul>
        );
    }
}
