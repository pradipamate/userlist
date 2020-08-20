import SignUpReducer from './SignUpReducer';
import MainReducer from './MainReducer';
import {combineReducers} from 'redux';

export default combineReducers({
        SignUp:SignUpReducer,
        MainReducer:MainReducer,
    })

