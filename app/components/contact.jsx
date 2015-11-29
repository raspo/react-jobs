import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import FormField from 'components/form-field';
import Icon from 'components/icon';

export default class Contact extends Component {
    static propTypes = {
        errors: PropTypes.object
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('send email');
    }

    render() {
        const { errors } = this.props;

        return (
            <DocumentTitle title="React.js Jobs - Contact us">
                <div className="page">
                    <header className="page-header">
                        <h2 className="page-header-title">Contact us</h2>
                    </header>
                    <section className="page-content">
                        <main className="main">
                            <div className="content-header">
                                <p>Have a question about pricing or discounts? Do you want to request a refund? Send us an email and we'll get back to you as soon as we can.</p>
                            </div>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <fieldset>
                                    <FormField name="name" label="Name" errors={errors} ref="name" />
                                    <FormField name="email" label="Email address" errors={errors} ref="email" />
                                    <FormField name="subject" label="Subject" ref="subject" />
                                    <FormField
                                        name="message"
                                        type="textarea"
                                        label="Message"
                                        errors={errors}
                                        ref="message" />
                                </fieldset>
                                <fieldset>
                                    <button type="submit" className="button">Send email</button>
                                </fieldset>
                            </form>
                        </main>
                        <aside className="sidebar">
                            <ul className="links">
                                <li>
                                    <a href="https://twitter.com/reactjs_jobs" target="_blank">
                                        <Icon name="twitter" /> Follow @reactjs_jobs
                                    </a>
                                </li>
                                <li className="separator"></li>
                                <li><Link to="/">Go back to job board</Link></li>
                            </ul>
                        </aside>
                    </section>
                </div>
            </DocumentTitle>
        );
    }
}
