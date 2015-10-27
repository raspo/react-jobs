import React from 'react';
const { Component, PropTypes } = React;
import Header from '../components/header';

export default class AppLayout extends Component {
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

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
};
