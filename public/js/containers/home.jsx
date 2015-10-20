import React from 'react';
const { Component } = React;
import { Link } from 'react-router';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                Filter
                <br/>
                Job List
                <br/>
                <Link to="/jobs/1">Job #1</Link>
                <br/>

                <Link to="/jobs/create">Post new job</Link>
            </div>
        );
    }
}
