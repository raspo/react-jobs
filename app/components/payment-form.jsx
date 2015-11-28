import React from 'react';
const { Component, PropTypes } = React;
import { Link } from 'react-router';
import FormField from 'components/form-field';

export default class PaymentForm extends Component {
    static propTypes = {
        jobId: PropTypes.string.isRequired,
        isProcessing: PropTypes.bool.isRequired,
        errors: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    }

    getCardData() {
        return {
            number: this.refs.number.getValue(),
            exp_month: this.refs.exp_month.getValue(),
            exp_year: this.refs.exp_year.getValue(),
            cvc: this.refs.cvc.getValue()
        };
    }

    getPostingData() {
        return {
            amount: 'base',
            id: this.props.jobId
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const card = this.getCardData();
        const posting = this.getPostingData();
        this.props.onSubmit({
            card,
            posting
        });
    }

    render() {
        const { errors, isProcessing } = this.props;
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
                                <FormField name="number" label="Card number" errors={errors} ref="number" />
                                <FormField name="cvc" label="CVC" errors={errors} ref="cvc" />
                                <FormField name="exp_month" label="Month" errors={errors} ref="exp_month" />
                                <FormField name="exp_year" label="Year" errors={errors} ref="exp_year" />
                            </fieldset>
                            <fieldset>
                                <p>Your ad is $99 and it will run for 30 days starting today.</p>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="button" disabled={isProcessing}>Place your order</button>
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
