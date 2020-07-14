import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';


export default function configureStore(preloadedState) {

    const middlewareEnhancer = applyMiddleware(thunkMiddleware);
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);

    return createStore(
        rootReducer,
        preloadedState,
        composedEnhancers
    );
}
