import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { absoluteURL } from 'utils';

export default class PaymentComplete extends Component {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    render() {
        const { slug, title } = this.props;
        const jobUrl = `/jobs/${slug}`;

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">Thank you!</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <div className="content-header">
                            <p>Your payment was successful. You should receive your email receipt shortly.</p>
                        </div>
                        <div className="content">
                            <article>
                                <p>Your job post <strong>{title}</strong> is on-line and accessible at the following address: <br/> <Link to={jobUrl}>{absoluteURL(jobUrl)}</Link></p>
                            </article>
                            <footer className="cta-container">
                                <Link className="button" to={jobUrl}>View your job listing</Link>
                            </footer>
                        </div>
                    </main>
                    <aside className="sidebar">
                        <ul className="links">
                            <li><Link to="/">Go back to job board</Link></li>
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}
