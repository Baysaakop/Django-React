import * as actionTypes from './actionTypes';
import axios from 'axios';
import api from '../../api';
import { message } from 'antd';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const authCreated = () => {
    return {
        type: actionTypes.AUTH_CREATED        
    };
}

export const logout = () => {
    localStorage.removeItem('token');    
    message.info("Signed out")
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(api.signin, {
            email: email,
            password: password
        })
        .then(res => {            
            const token = res.data.key;            
            localStorage.setItem('token', token);            
            dispatch(authSuccess(token));                        
        })
        .catch(err => {
            dispatch(authFail(err));            
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {        
        dispatch(authStart());
        axios.post(api.signup, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            dispatch(authCreated())           
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authPasswordReset = (email) => {
    return dispatch => {        
        axios.post(api.passwordreset, {
            email: email            
        })
        .then(res => {            
            console.log(res)                    
        })
        .catch(err => {
            dispatch(authFail(err));            
        })
    }
}