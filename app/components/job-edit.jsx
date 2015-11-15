import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import { jobTypesMap } from 'utils';
import FormField from 'components/form-field';

class JobView extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        address: PropTypes.string,
        type: PropTypes.string,
        url: PropTypes.string,
        companyName: PropTypes.string,
        companyWebsite: PropTypes.string,
        companyEmail: PropTypes.string,
        companyTwitter: PropTypes.string,
        errors: PropTypes.object,
        isNew: PropTypes.bool,
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        isNew: false
    }

    getFormData() {
        return {
            title: this.refs.title.getValue(),
            type: this.refs.type.getValue(),
            description: this.refs.description.getValue(),
            address: this.refs.address.getValue(),
            url: this.refs.url.getValue(),
            companyName: this.refs.companyName.getValue(),
            companyWebsite: this.refs.companyWebsite.getValue(),
            companyEmail: this.refs.companyEmail.getValue(),
            companyTwitter: this.refs.companyTwitter.getValue()
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.getFormData();
        this.props.onSubmit({
            ...data,
            id: this.props.id
        });
    }

    render() {
        const {title, description, address, type, url, companyName, companyWebsite, companyEmail, companyTwitter, errors, isNew} = this.props;

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">{isNew ? 'Create your job listing' : 'Edit job listing'}</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <fieldset>
                                <FormField name="title" label="Job title" defaultValue={title} errors={errors} ref="title" />
                                <FormField name="type" type="select" options={jobTypesMap} label="Job type" defaultValue={type} errors={errors} ref="type" />
                                <FormField name="address" label="Job location" defaultValue={address} errors={errors} ref="address" />
                                <FormField
                                    name="description"
                                    type="textarea"
                                    label="Description"
                                    instructions="Basic HTML and Markdown allowed"
                                    defaultValue={description}
                                    errors={errors}
                                    ref="description" />
                                <FormField name="url" label="Application URL" defaultValue={url} errors={errors} ref="url" />
                            </fieldset>
                            <fieldset>
                                <legend>About the company</legend>
                                <FormField name="companyName" label="Company name" defaultValue={companyName} errors={errors} ref="companyName" />
                                <FormField name="companyWebsite" label="Company website" defaultValue={companyWebsite} errors={errors} ref="companyWebsite" />
                                <FormField
                                    name="companyEmail"
                                    label="Email"
                                    instructions="This is where we’ll send your confirmation email"
                                    defaultValue={companyEmail}
                                    errors={errors}
                                    ref="companyEmail" />
                                <FormField
                                    name="companyTwitter"
                                    label="Twitter handle"
                                    instructions="Used to display the company logo"
                                    defaultValue={companyTwitter} errors={errors}
                                    ref="companyTwitter" />
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="button">{isNew ? 'Preview job listing' : 'Save changes'}</button>
                            </fieldset>
                        </form>
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

export default JobView;
