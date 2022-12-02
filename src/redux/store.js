import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './reducers/user-reducer';

export const store = createStore(usersReducer, applyMiddleware(thunk));