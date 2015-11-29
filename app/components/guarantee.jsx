import React from 'react';
const { Component } = React;
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

export default class Guarantee extends Component {
    render() {
        return (
            <DocumentTitle title="React.js Jobs - Our guarantee">
                <div className="page">
                    <header className="page-header">
                        <main className="main">
                            <h2 className="page-header-title">Our Guarantee</h2>
                        </main>
                        <aside className="sidebar">
                            <Link className="button button-fluid" to="/jobs/new">Post a job</Link>
                        </aside>
                    </header>
                    <section className="page-content">
                        <main className="main content">
                            <article>
                                <p>When you list a job with us, we intend to help you find the talent you need, and that's the result we guarantee.</p>
                                <p>If you're not 100% satisfied with the results from your listing, request a free reposting or a full refund within 30 days after your listing expires.</p>
                                <p>It's that easy.</p>
                            </article>
                        </main>
                        <aside className="sidebar">
                            <ul className="links">
                                <li><Link to="/">Go back to job board</Link></li>
                            </ul>
                        </aside>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}
