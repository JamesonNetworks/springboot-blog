import { combineReducers } from 'redux';
import blog from './blog';
import comments from './comments';

const blogGuts = combineReducers({
    blog,
    comments
})

export default blogGuts
