import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import marked from 'marked';
import { simpleDate, prettyJobType } from 'utils';
import Icon from 'components/icon';
import Loading from 'components/loading';

class JobView extends Component {
    static propTypes = {
        slug: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        companyName: PropTypes.string,
        companyWebsite: PropTypes.string,
        companyLogo: PropTypes.string,
        address: PropTypes.string,
        type: PropTypes.string,
        publishedAt: PropTypes.string,
        isFetching: PropTypes.bool.isRequired,
        isPreview: PropTypes.bool
    }

    renderContent() {
        return {
            __html: marked(this.props.description || '', {
                sanitize: false,
                tables: false,
                breaks: true
            })
        };
    }

    renderActions() {
        const {slug, isPreview} = this.props;
        const editUrl = `/jobs/${slug}/edit`;
        const paymentUrl = `/jobs/${slug}/payment`;
        const applicationUrl = `/jobs/${slug}/apply`;

        if (isPreview) {
            return (
                <div className="page-actions">
                    <Link className="button" to={editUrl}>Edit</Link>
                    <Link className="button button-right" to={paymentUrl}>Proceed to payment</Link>
                </div>
            );
        }

        return (
            <footer className="cta-container">
                <Link className="button" to={applicationUrl}>Apply now</Link>
            </footer>
        );
    }

    renderCompanyWebsiteUrl(url) {
        if (!url) { return null; }

        return (
            <li>
                <a href={url} target="_blank">
                    <Icon name="earth" /> Visit company website
                </a>
            </li>
        );
    }

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }

        const {
            title,
            companyName,
            companyWebsite,
            companyLogo,
            address,
            type,
            publishedAt,
            isPreview
        } = this.props;
        const logoURI = companyLogo || '/img/company-logo.png';

        return (
            <DocumentTitle title={'React.js Jobs - ' + (isPreview ? 'Preview - ' : '') + title}>
                <div className="page">
                    <header className="page-header">
                        <h2 className="page-header-title">{title}</h2>
                    </header>
                    <section className="page-content">
                        <main className="main content">
                            <header className="job-details">
                                <img src={logoURI} alt={companyName} />
                                <h3>{companyName}</h3>
                                <address>{address}</address>
                                <div className="job-meta">
                                    <span>{prettyJobType(type)}</span>
                                    <time>{simpleDate(publishedAt)}</time>
                                </div>
                            </header>
                            <article dangerouslySetInnerHTML={this.renderContent()}></article>
                            {this.renderActions()}
                        </main>
                        <aside className="sidebar">
                            <ul className="links">
                                {this.renderCompanyWebsiteUrl(companyWebsite)}
                                <li>
                                    <Link to="/">
                                        <Icon name="flag" /> Report this listing
                                    </Link>
                                </li>
                                <li className="separator"></li>
                                <li>
                                    <Link to="/">Go back to job board</Link>
                                </li>
                            </ul>
                        </aside>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}

export default JobView;
