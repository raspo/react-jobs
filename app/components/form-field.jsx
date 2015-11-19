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
        action: PropTypes.string,
        options: PropTypes.object,
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
                {_.map(options, (text, value) => <option key={value} value={value}>{text}</option>)}
            </select>
        );
    }

    renderRadio() {
        const {name, defaultValue, options} = this.props;
        const fieldId = `field-radio-${name}`;

        return (
            <div className="radio-container" ref="field">
                {_.map(options, (text, value) => {
                    const checked = defaultValue === value;
                    const optionId = `${fieldId}-${value}`;
                    return (
                        <label key={value} htmlFor={optionId} className="label-radio">
                            <input type="radio" value={value} id={optionId} name={fieldId} defaultChecked={checked} /><span>{text}</span>
                        </label>
                    );
                })}
            </div>
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

    renderActionInput() {
        const {name, defaultValue, action} = this.props;
        const fieldId = `field-${name}`;

        return (
            <div className="field-with-button">
                <input type="text" id={fieldId} defaultValue={defaultValue} ref="field" />
                <button>{action}</button>
            </div>
        );
    }

    renderField() {
        const {type} = this.props;

        switch (type) {
            case 'select':
                return this.renderSelect();
            case 'textarea':
                return this.renderTextarea();
            case 'radio':
                return this.renderRadio();
            case 'actioninput':
                return this.renderActionInput();
            default:
                return this.renderTextInput();
        }
    }

    render() {
        const {name, label, errors} = this.props;
        const fieldId = `field-${name}`;
        const error = _.get(errors, name) || false;
        const classes = classNames({
            'is-invalid': !!error,
            'field': true
        });

        return (
            <div className={classes}>
                <label htmlFor={fieldId}>{label}</label>
                <div>
                    {this.renderField()}
                    {this.renderInstructions()}
                </div>
            </div>
        );
    }
}

export default FormField;
