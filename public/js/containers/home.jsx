import React from 'react';
const { Component } = React;
import { Link } from 'react-router';
import Filter from '../components/filter';
import JobList from '../components/job-list';

export default class Home extends Component {
    getJobFixtures() {
        const jobs = [];

        for (let id = 0; id < 10; id++) {
            jobs.push({
                id,
                title: `Job Title #${id}`,
                company: 'That Company Inc.',
                location: 'London, UK',
                logo: '',
                created: Date.now() - (id * 10 * 24 * 60 * 60 * 1000)
            });
        }

        return jobs;
    }

    render() {
        return (
            <div className="content cf">
                <section className="main">
                    <header className="content-header">
                        <Filter />
                    </header>
                    <div className="content-body">
                        <JobList jobs={this.getJobFixtures()} />
                    </div>
                </section>
                <aside className="sidebar">
                    <Link className="button button-fluid" to="/jobs/create">Post new job</Link>
                </aside>
            </div>
        );
    }
}
