import React from 'react';
const { Component } = React;

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <h1 className="logo">React Job Board</h1>
                </div>
            </header>
        );
    }
}
