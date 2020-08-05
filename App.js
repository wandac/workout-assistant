import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Navigator from './src/navigations';
import exerciseReducer from './src/redux/reducers/exerciseReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(exerciseReducer);

class App extends Component {
    render() {
        return(
            <Provider store = {store}>
                <Navigator/>
            </Provider>
        );
    }
}

export default App;
