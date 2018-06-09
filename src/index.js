import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import {createStore,combineReducers} from 'redux';
import current_user_reducer from './reducers/current_user';
import users_list_reducer from './reducers/users_list';


const reducer  = combineReducers({current_user:current_user_reducer,
    users:users_list_reducer,
    form:formReducer});
const history = createBrowserHistory();
const store = createStore(reducer);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>), document.getElementById('root'));

registerServiceWorker();
