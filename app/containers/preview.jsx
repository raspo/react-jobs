import React from 'react';
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { unsetPreview } from 'actions/preview';
import JobView from 'components/job-view';

class Preview extends Component {
    static propTypes = {
        preview: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { preview, dispatch } = this.props;
        if (preview === null) {
            dispatch(pushState(null, '/'));
        }
    }

    componentWillUnMount() {
        const { dispatch } = this.props;
        dispatch(unsetPreview());
    }

    render() {
        const { preview } = this.props;
        return preview ? <JobView {...preview} /> : null;
    }
}

function previewSelector(state) {
    const { preview } = state;
    return { preview };
}

export default connect(previewSelector)(Preview);
