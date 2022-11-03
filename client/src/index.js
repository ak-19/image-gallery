import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Application from './application';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Application />
    </Provider>
);

