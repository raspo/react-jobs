import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import Header from 'components/header';

class AppLayout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        return (
            <div className="app-layout">
                <Header />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function layoutSelector(state) {
    return {
        routerState: state.router
    };
}

export default connect(layoutSelector)(AppLayout);
