import React from 'react';
const { Component } = React;
import { Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    &copy; 2015 reactjs-jobs.com - <Link to="/guarantee">Our Guarantee</Link> - <Link to="/contact">Contact Us</Link>
                </div>
            </footer>
        );
    }
}
