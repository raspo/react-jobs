import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import DocumentTitle from 'react-document-title';
import { getJob } from 'actions/job';
import { processPayment } from 'actions/payment';
import PaymentForm from 'components/payment-form';
import scriptLoader from 'components/script-loader';
import Loading from 'components/loading';

class Payment extends Component {
    static propTypes = {
        scriptsReady: PropTypes.bool,
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, routeParams } = this.props;
        const id = routeParams.slug.replace(/-(.*)/gi, '');
        dispatch(getJob(id));
    }

    componentWillReceiveProps(newProps) {
        this.ensureAuthorization(newProps);
    }

    ensureAuthorization(props) {
        const { dispatch } = this.props;
        if (props.publishedAt) {
            dispatch(replaceState(null, '/'));
        }
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(processPayment(data));
    }

    render() {
        const { isFetching, scriptsReady } = this.props;
        if (isFetching || !scriptsReady) {
            return <Loading />;
        }

        const props = {
            ...this.props,
            onSubmit: this.handleSubmit.bind(this)
        };

        return (
            <DocumentTitle title="React Jobs - Payment">
                <PaymentForm {...props} />
            </DocumentTitle>
        );
    }
}

function jobSelector(state) {
    const { job } = state;
    return { ...job };
}

export default scriptLoader(connect(jobSelector)(Payment), ['https://js.stripe.com/v2/']);
