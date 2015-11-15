import _ from 'lodash';
import React from 'react';
const { Component, PropTypes } = React;
import classNames from 'classnames';

class FormField extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        defaultValue: PropTypes.string,
        instructions: PropTypes.string,
        type: PropTypes.string,
        options: PropTypes.array,
        errors: PropTypes.object
    }

    static defaultProps = {
        type: 'text'
    }

    getValue() {
        return this.refs.field.value.trim();
    }

    renderInstructions() {
        const {instructions} = this.props;
        if (instructions) {
            return <p className="instructions">{instructions}</p>;
        }
    }

    renderSelect() {
        const {name, defaultValue, options} = this.props;
        const fieldId = `field-${name}`;

        return (
            <select id={fieldId} defaultValue={defaultValue} ref="field">
                {_.map(options, (opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
            </select>
        );
    }

    renderTextarea() {
        const {name, defaultValue} = this.props;
        const fieldId = `field-${name}`;

        return <textarea id={fieldId} defaultValue={defaultValue} cols="30" rows="10" ref="field" />;
    }

    renderTextInput() {
        const {name, defaultValue} = this.props;
        const fieldId = `field-${name}`;

        return <input type="text" id={fieldId} defaultValue={defaultValue} ref="field" />;
    }

    renderField() {
        const {type} = this.props;

        switch (type) {
            case 'select':
                return this.renderSelect();
            case 'textarea':
                return this.renderTextarea();
            default:
                return this.renderTextInput();
        }
    }

    render() {
        const {name, label, errors} = this.props;
        const fieldId = `field-${name}`;
        const error = _.get(errors, name) || false;
        const classes = classNames({
            'is-invalid': !!error
        });

        return (
            <label htmlFor={fieldId} className={classes}>
                <span>{label}</span>
                <div>
                    {this.renderField()}
                    {this.renderInstructions()}
                </div>
            </label>
        );
    }
}

export default FormField;
