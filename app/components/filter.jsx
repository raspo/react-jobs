import React from 'react';
const { Component, PropTypes } = React;
import Icon from 'components/icon';

class Filter extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    handleKeyUp(event) {
        const value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="filter">
                <input type="text"
                    className="input-filter"
                    onKeyUp={this.handleKeyUp.bind(this)}
                    defaultValue={this.props.value}
                    placeholder="Filter jobs, companies, location..." />
                <Icon name="search" />
            </div>
        );
    }
}

export default Filter;
