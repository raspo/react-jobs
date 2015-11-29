import React from 'react';
const { Component } = React;
import { Link } from 'react-router';
import Icon from 'components/icon';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <h1 className="logo">
                        <Link to="/">
                            <Icon name="react-logo" />
                            <span>React.js Jobs</span>
                        </Link>
                    </h1>
                </div>
            </header>
        );
    }
}
