import _ from 'lodash';
import React from 'react';
const { Component: ReactComponent } = React;

const loadedScripts = {};

function injectScript(scriptURL, callback) {
    if (loadedScripts[scriptURL] === true) {
        callback();
        return;
    }

    if (loadedScripts[scriptURL] !== undefined) {
        return;
    }

    loadedScripts[scriptURL] = false;

    const script = document.createElement('script');
    script.src = scriptURL;
    script.async = 1;

    script.onload = () => {
        loadedScripts[scriptURL] = true;
        callback();
    };

    script.onerror = () => {
        console.error('Error trying to load script: ' + scriptURL);
        delete loadedScripts[scriptURL];
    };

    // (old) IE browsers may call 'onreadystatechange' instead of 'onload'
    script.onreadystatechange = () => {
        if (this.readyState === 'loaded') {
            // wait for other events, then call onload if default onload hadn't been called
            if (loadedScripts[scriptURL] !== true) {
                window.setTimeout(script.onload, 0);
            }
        }
    };

    document.body.appendChild(script);
}

export default function scriptLoader(Component, scripts) {
    class ScriptLoader extends ReactComponent {
        constructor(props) {
            super(props);
            this.state = {
                scriptsReady: false
            };
        }

        onScriptLoaded() {
            const scriptsToLoad = _.reduce(scripts, (result, scriptURL) => {
                if (loadedScripts[scriptURL] !== true) {
                    return result + 1;
                }
                return result;
            }, 0);

            if (scriptsToLoad === 0) {
                this.setState({
                    scriptsReady: true
                });
            }
        }

        componentDidMount() {
            scripts.forEach((scriptURL) => {
                injectScript(scriptURL, this.onScriptLoaded.bind(this));
            });
        }

        render() {
            const props = {
                ...this.props,
                scriptsReady: this.state.scriptsReady
            };

            return <Component {...props} />;
        }
    }

    return ScriptLoader;
}
