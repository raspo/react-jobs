import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import DocumentTitle from 'react-document-title';
import { getJob } from 'actions/job';
import { submitPayment } from 'actions/payment';
import PaymentComplete from 'components/payment-complete';
import PaymentForm from 'components/payment-form';
import scriptLoader from 'components/script-loader';
import Loading from 'components/loading';

class Payment extends Component {
    static propTypes = {
        scriptsReady: PropTypes.bool,
        slug: PropTypes.string,
        title: PropTypes.string,
        isComplete: PropTypes.bool,
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        this.ensureAuthorization(this.props);
        dispatch(getJob(id));
    }

    componentWillReceiveProps(newProps) {
        this.ensureAuthorization(newProps);
    }

    ensureAuthorization(props) {
        const { dispatch } = this.props;
        if (props.publishedAt && !props.isComplete) {
            dispatch(replaceState(null, '/'));
        }
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(submitPayment(data));
    }

    render() {
        const { isComplete, isFetching, scriptsReady, slug, title } = this.props;

        if (isComplete === true) {
            return (
                <DocumentTitle title="React.js Jobs - Payment">
                    <PaymentComplete slug={slug} title={title} />
                </DocumentTitle>
            );
        }

        if (isFetching || !scriptsReady) {
            return <Loading />;
        }

        const props = {
            ...this.props,
            onSubmit: this.handleSubmit.bind(this)
        };

        return (
            <DocumentTitle title="React.js Jobs - Payment">
                <PaymentForm {...props} />
            </DocumentTitle>
        );
    }
}

function jobSelector(state) {
    const { job, payment } = state;

    return {
        id: job.id,
        slug: job.slug,
        title: job.title,
        errors: {
            ...job.errors,
            ...payment.errors
        },
        publishedAt: job.publishedAt,
        isFetching: job.isFetching,
        isProcessing: payment.isProcessing,
        isComplete: payment.isComplete
    };
}

export default scriptLoader(connect(jobSelector)(Payment), ['https://js.stripe.com/v2/']);
