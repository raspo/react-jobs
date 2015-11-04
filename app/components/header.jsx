import React from 'react';
const { Component } = React;
import { Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <h1 className="logo">
                        <Link to="/">React Jobs</Link>
                    </h1>
                </div>
            </header>
        );
    }
}
