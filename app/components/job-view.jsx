import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { simpleDate } from 'utils';
import Loading from 'components/loading';

class JobView extends Component {
    static propTypes = {
        slug: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        companyName: PropTypes.string,
        companyWebsite: PropTypes.string,
        address: PropTypes.string,
        type: PropTypes.string,
        publishedAt: PropTypes.string,
        logo: PropTypes.string,
        isFetching: PropTypes.bool.isRequired,
        isPreview: PropTypes.bool
    }

    renderContent() {
        return {
            __html: this.props.description
        };
    }

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }

        const { slug, title, companyName, companyWebsite, address, type, publishedAt, logo } = this.props;
        const logoURI = logo || '/img/company-logo.png';
        const editUrl = `/jobs/${slug}/edit`;

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">{title}</h2>
                </header>
                <section className="page-content">
                    <main className="main job">
                        <header className="job-details">
                            <img src={logoURI} alt={companyName} />
                            <h3>{companyName}</h3>
                            <address>{address}</address>
                            <div className="job-meta">
                                <span>{type}</span>
                                <time>{simpleDate(publishedAt)}</time>
                            </div>
                        </header>
                        <article dangerouslySetInnerHTML={this.renderContent()}></article>
                        <footer className="job-apply">
                            <Link className="button" to="/jobs/create">Apply now</Link>
                        </footer>
                    </main>
                    <aside className="sidebar">
                        <ul className="links">
                            <li><a href={companyWebsite}>Visit company website</a></li>
                            <li><Link to="/">Report this listing</Link></li>
                            <li className="separator"></li>
                            <li><Link to="/">Go back to job board</Link></li>
                            <li className="separator"></li>
                            <li><Link to={editUrl}>Edit this listing</Link></li>
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}

export default JobView;
