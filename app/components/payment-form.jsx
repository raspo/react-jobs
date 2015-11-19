import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
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
        onSubmit: PropTypes.func.isRequired
    }

    getFormData() {
        return {
            title: this.refs.title.getValue()
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
        const {errors} = this.props;
        const amounts = {
            'base': '30 days at $99',
            'extended': '60 days at $149',
            'premium': '90 days at $199'
        };

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">Purchase your job post</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <fieldset>
                                <FormField name="amount" type="radio" options={amounts} label="Show my post for" defaultValue="base" errors={errors} ref="amount" />
                            </fieldset>
                            <fieldset>
                                <FormField name="coupon" type="actioninput" label="Coupon code" action="Apply" errors={errors} ref="coupon" />
                            </fieldset>
                            <fieldset>
                                <p>Your ad is $99 and it will run for 30 days starting today.</p>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="button">Place your order</button>
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
