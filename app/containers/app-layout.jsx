import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { redirect, hardRedirect } from 'actions/app';
import Header from 'components/header';
import Footer from 'components/footer';

class AppLayout extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    }

    componentWillReceiveProps(newProps) {
        const { dispatch } = this.props;
        const { app } = newProps;
        if (app.redirect) {
            dispatch(redirect(app.redirect));
        }
        if (app.hardredirect) {
            dispatch(hardRedirect(app.hardredirect));
        }
    }

    render() {
        return (
            <div className="app-layout">
                <Header />
                <div className="container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

function layoutSelector(state) {
    const { app } = state;
    return { app };
}

export default connect(layoutSelector)(AppLayout);
