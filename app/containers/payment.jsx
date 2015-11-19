import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { getJob } from 'actions/job';
import { processPayment } from 'actions/payment';
import PaymentForm from 'components/payment-form';
import Loading from 'components/loading';

class Payment extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        routeParams: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        // TODO check if you have job already
        // if non authorized, redirect to /
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
        if (props.publishedAt) {
            dispatch(replaceState(null, '/'));
        }
    }

    handleSubmit(data) {
        const { dispatch } = this.props;
        dispatch(processPayment(data));
    }

    render() {
        if (this.props.isFetching) {
            return <Loading />;
        }

        const props = {
            ...this.props,
            onSubmit: this.handleSubmit.bind(this)
        };

        return <PaymentForm {...props} />;
    }
}

function jobSelector(state) {
    const { job } = state;
    return { ...job };
}

export default connect(jobSelector)(Payment);
