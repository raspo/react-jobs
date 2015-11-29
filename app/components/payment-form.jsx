import _ from 'lodash';
import React from 'react';
const { Component, PropTypes } = React;
import classNames from 'classnames';
import { Link } from 'react-router';
import { pricingMap, months, getCardYears } from 'utils';
import FormField from 'components/form-field';

export default class PaymentForm extends Component {
    static propTypes = {
        jobId: PropTypes.string.isRequired,
        isProcessing: PropTypes.bool.isRequired,
        errors: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            amount: 'base'
        };
    }

    getCardData() {
        return {
            number: this.refs.number.getValue(),
            exp_month: this.refs.exp_month.value,
            exp_year: this.refs.exp_year.value,
            cvc: this.refs.cvc.getValue()
        };
    }

    getPostingData() {
        return {
            amount: this.state.amount,
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

    handleAmountChange(value) {
        this.setState({
            amount: value
        });
    }

    renderAmountSelector() {
        return (
            <div className="field">
                <label htmlFor="amount">Show job post for</label>
                <div className="radio-container" ref="amount">
                    {_.map(pricingMap, (pricing, key) => {
                        const checked = key === this.state.amount;
                        const optionId = `amount-${key}`;
                        return (
                            <label key={key} htmlFor={optionId} className="label-radio">
                                <input
                                    type="radio"
                                    value={key}
                                    id={optionId}
                                    name="amount"
                                    checked={checked}
                                    onChange={this.handleAmountChange.bind(this, key)}/>
                                <span>{pricing.duration} days - ${pricing.cost}</span>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }

    renderExpirationFields() {
        return (
            <div className="field">
                <label htmlFor="exp_month">Expiration date</label>
                <div className="field-card-expiration">
                    <select id="exp_month" ref="exp_month">
                        {_.map(months, m => <option key={m.num} value={m.num}>{m.num} - {m.name}</option>)}
                    </select>
                    <select id="exp_year" ref="exp_year">
                        {_.map(getCardYears(), year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>
        );
    }

    renderErrors() {
        const { errors } = this.props;

        if (_.isEmpty(errors)) { return null; }

        return (
            <div className="alert">
                <p>
                    <strong>Sorry, we couldn't process your payment.</strong> <br/> <small>Your credit card number or expiration date may have been incorrect. Please try again.</small>
                </p>
            </div>
        );
    }

    renderSummary() {
        const pricing = pricingMap[this.state.amount];
        return (
            <p>Your job listing is ${pricing.cost} and it will run for {pricing.duration} days starting today.</p>
        );
    }

    render() {
        const { errors, isProcessing } = this.props;
        const buttonText = isProcessing ? 'Processing...' : 'Place your order';

        return (
            <div className="page">
                <header className="page-header">
                    <h2 className="page-header-title">Purchase your job post</h2>
                </header>
                <section className="page-content">
                    <main className="main">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {this.renderErrors()}
                            <fieldset>
                                {this.renderAmountSelector()}
                            </fieldset>
                            <fieldset>
                                <FormField name="number" label="Card number" errors={errors} ref="number" />
                                {this.renderExpirationFields()}
                                <FormField name="cvc" label="CVC" errors={errors} ref="cvc" />
                            </fieldset>
                            <fieldset>
                                {this.renderSummary()}
                                <p className="terms">Your listing will be reviewed by our staff and it may be removed if it is for a position that involves adult content, an illegitimate work opportunity, or contains inappropriate language. We will refund your money if removed. Any questions? <Link to="/contact">Contact us</Link>.
                                </p>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="button button-payment" disabled={isProcessing}>{buttonText}</button>
                            </fieldset>
                        </form>
                    </main>
                    <aside className="sidebar">
                        <p>All major credit cards accepted. Payments are processed using <a href="https://stripe.com/" target="_blank">Stripe</a>. Feel free to <Link to="/contact">contact us</Link> with any questions.</p>
                        <ul className="links">
                            <li className="separator"></li>
                            <li><Link to="/">Go back to job board</Link></li>
                        </ul>
                    </aside>
                </section>
            </div>
        );
    }
}
