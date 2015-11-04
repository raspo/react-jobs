import React from 'react';
const { Component } = React;
import { Link } from 'react-router';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.defaultLogo = '/img/company-logo.png';
        this.state = {
            logoUrl: this.defaultLogo
        };
    }

    render() {
        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">Create your job listing</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <form>
                            <fieldset>
                                <label htmlFor="field-job-title">
                                    <span>Job title</span>
                                    <div>
                                        <input type="text" id="field-job-title" />
                                    </div>
                                </label>
                                <label htmlFor="field-job-type">
                                    <span>Job type</span>
                                    <div>
                                        <select id="field-job-type">
                                            <option value="fulltime">Full Time</option>
                                            <option value="contract">Contract</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                    </div>
                                </label>
                                <label htmlFor="field-job-address">
                                    <span>Job location</span>
                                    <div>
                                        <input type="text" id="field-job-address" />
                                    </div>
                                </label>
                                <label htmlFor="field-job-description">
                                    <span>Description</span>
                                    <div>
                                        <textarea id="field-job-description" cols="30" rows="10"></textarea>
                                        <p className="instructions">Basic HTML and Markdown allowed</p>
                                    </div>
                                </label>
                                <label htmlFor="field-job-url">
                                    <span>Application URL</span>
                                    <div>
                                        <input type="text" id="field-job-url" defaultValue="http://" />
                                    </div>
                                </label>
                            </fieldset>
                            <fieldset>
                                <legend>About the company</legend>
                                <label htmlFor="field-company-name">
                                    <span>Company name</span>
                                    <div>
                                        <input type="text" id="field-company-name" />
                                    </div>
                                </label>
                                <label htmlFor="field-company-website">
                                    <span>Company website</span>
                                    <div>
                                        <input type="text" id="field-company-website" defaultValue="http://" />
                                    </div>
                                </label>
                                <label htmlFor="field-company-twitter">
                                    <span>Twitter handle</span>
                                    <div>
                                        <div className="field-with-button">
                                            <input type="text" id="field-company-twitter" />
                                            <button>Update</button>
                                        </div>
                                        <p className="instructions">Used to display the company logo</p>
                                    </div>
                                </label>
                                <label>
                                    <span>Logo</span>
                                    <div>
                                        <img src={this.state.logoUrl} alt="Company logo" className="company-logo" />
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
