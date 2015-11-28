import React from 'react';
const { Component } = React;

export default class Loading extends Component {
    render() {
        return (
            <div className="page">
                <div className="loading">loading ...</div>
            </div>
        );
    }
}
