import { combineReducers } from 'redux';

import data from './posts';
import auth from './auth';

export default combineReducers({ auth, data })