import {combineReducers} from 'redux';
import commentsReducer from './commentsReducer';
import pagesReducer from './pagesReducer';
import { routerReducer } from 'react-router-redux';

const allReducers = combineReducers ({
    routing: routerReducer,
    comments: commentsReducer,
    pages: pagesReducer
});

export default allReducers