import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import { setPreview } from 'actions/preview';

class Create extends Component {
    static propTypes = {
        preview: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    }

    componentWillReceiveProps(newProps) {
        const { dispatch } = this.props;
        if (newProps.preview) {
            dispatch(pushState(null, '/jobs/create/preview'));
        }
    }

    getFormData() {
        return {
            title: this.refs.title.value.trim(),
            type: this.refs.type.value.trim(),
            address: this.refs.address.value.trim(),
            description: this.refs.description.value.trim(),
            url: this.refs.url.value.trim(),
            companyName: this.refs.companyName.value.trim(),
            companyWebsite: this.refs.companyWebsite.value.trim(),
            companyTwitter: this.refs.companyTwitter.value.trim()
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.getFormData();
        console.log(data);

        const { dispatch } = this.props;
        dispatch(setPreview(data));
    }

    render() {
        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">Create your job listing</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <fieldset>
                                <label htmlFor="field-job-title">
                                    <span>Job title</span>
                                    <div>
                                        <input type="text" id="field-job-title" ref="title"/>
                                    </div>
                                </label>
                                <label htmlFor="field-job-type">
                                    <span>Job type</span>
                                    <div>
                                        <select id="field-job-type" ref="type">
                                            <option value="fulltime">Full Time</option>
                                            <option value="contract">Contract</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                    </div>
                                </label>
                                <label htmlFor="field-job-address">
                                    <span>Job location</span>
                                    <div>
                                        <input type="text" id="field-job-address" ref="address"/>
                                    </div>
                                </label>
                                <label htmlFor="field-job-description">
                                    <span>Description</span>
                                    <div>
                                        <textarea id="field-job-description" cols="30" rows="10" ref="description"/>
                                        <p className="instructions">Basic HTML and Markdown allowed</p>
                                    </div>
                                </label>
                                <label htmlFor="field-job-url">
                                    <span>Application URL</span>
                                    <div>
                                        <input type="text" id="field-job-url" defaultValue="http://" ref="url"/>
                                    </div>
                                </label>
                            </fieldset>
                            <fieldset>
                                <legend>About the company</legend>
                                <label htmlFor="field-company-name">
                                    <span>Company name</span>
                                    <div>
                                        <input type="text" id="field-company-name" ref="companyName"/>
                                    </div>
                                </label>
                                <label htmlFor="field-company-website">
                                    <span>Company website</span>
                                    <div>
                                        <input type="text" id="field-company-website" defaultValue="http://" ref="companyWebsite"/>
                                    </div>
                                </label>
                                <label htmlFor="field-company-twitter">
                                    <span>Twitter handle</span>
                                    <div>
                                        <input type="text" id="field-company-twitter" ref="companyTwitter"/>
                                        <p className="instructions">Used to display the company logo</p>
                                    </div>
                                </label>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="button">Preview job listing</button>
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

function previewSelector(state) {
    const { preview } = state;
    return { preview };
}

export default connect(previewSelector)(Create);
