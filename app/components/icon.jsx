import React from 'react';
const { Component, PropTypes } = React;

class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render() {
        const { name } = this.props;
        return (
            <svg className={'icon icon-' + name}>
                <use xlinkHref={'#' + name} />
            </svg>
        );
    }
}

export default Icon;
