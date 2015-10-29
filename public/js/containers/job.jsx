import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { simpleDate } from '../utils';
import { getJob } from '../actions/job';

function mapStateToProps(state) {
    const { job } = state;
    return { ...job };
}

@connect(mapStateToProps)
export default class Job extends Component {
    static propTypes = {
        id: PropTypes.string,
        slug: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        company: PropTypes.string,
        address: PropTypes.string,
        type: PropTypes.string,
        created: PropTypes.number,
        logo: PropTypes.string,
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        dispatch(getJob(routeParams.id));
    }

    renderContent() {
        return {
            __html: this.props.content
        };
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div>Is fetching</div>
            );
        }

        const { title, company, address, type, created, logo } = this.props;
        const logoURI = logo || '/img/company-logo.png';

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">{title}</h2>
                </header>
                <section className="page-content">
                    <main className="main job">
                        <header className="job-details">
                            <img src={logoURI} alt={company} />
                            <h3>{company}</h3>
                            <address>{address}</address>
                            <div className="job-meta">
                                <span>{type}</span>
                                <time>{simpleDate(created)}</time>
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
