import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createMiddleware from 'redux-saga';
import reducers from './reducers';
import appSaga from '../saga/appSaga';

const reducer = combineReducers(reducers);
const sagaMiddleware = createMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(appSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
