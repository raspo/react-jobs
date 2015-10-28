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
                address: 'London, UK',
                logo: '',
                created: Date.now() - (id * 10 * 24 * 60 * 60 * 1000)
            });
        }

        return jobs;
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
                        <JobList jobs={this.getJobFixtures()} />
                    </main>
                    <aside className="sidebar">
                        blah blah
                    </aside>
                </section>
            </div>
        );
    }
}
