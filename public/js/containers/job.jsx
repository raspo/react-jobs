import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { simpleDate } from '../utils';

export default class Job extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        logo: PropTypes.string
    }

    static defaultProps = {
        id: 1,
        slug: 'job-title-that-is-super-interesting',
        title: 'Job title that is super interesting',
        content: '<h3>About you</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li><li>Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</li><li>Lorem voluptatibus nemo atque similique itaque deleniti harum quaerat.</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><h3>The job</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p>',
        company: 'That awesome company',
        address: 'San Francisco, CA',
        type: 'full-time',
        created: Date.now() - (35 * 24 * 60 * 60 * 1000)
    }

    renderContent() {
        return {
            __html: this.props.content
        };
    }

    render() {
        const logoURI = this.props.logo || '/img/company-logo.png';

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">{this.props.title}</h2>
                </header>
                <section className="page-content">
                    <main className="main job">
                        <header className="job-details">
                            <img src={logoURI} alt={this.props.company} />
                            <h3>{this.props.company}</h3>
                            <address>{this.props.address}</address>
                            <div className="job-meta">
                                <span>{this.props.type}</span>
                                <time>{simpleDate(this.props.created)}</time>
                            </div>
                        </header>
                        <article dangerouslySetInnerHTML={this.renderContent()}></article>
                        <footer className="job-apply">
                            <Link className="button" to="/jobs/create">Apply now</Link>
                        </footer>
                    </main>
                    <aside className="sidebar">
                        <ul className="links">
                            <li><a href="#">Visit company website</a></li>
                            <li><Link to="/">Report this listing</Link></li>
                            <li className="separator"></li>
                            <li><Link to="/">Go back to job board</Link></li>
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}
