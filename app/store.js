import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk';
import routes from 'routes';
import rootReducer from 'reducers';

// TEMP
import createLogger from 'redux-logger';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  // TEMP
  applyMiddleware(createLogger())
)(createStore);

const store = finalCreateStore(rootReducer);

export default store;
