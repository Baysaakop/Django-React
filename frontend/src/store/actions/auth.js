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

export const logout = () => {
    localStorage.removeItem('token');    
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
            // message.info(`Welcome, ${username}`);
        })
        .catch(err => {
            dispatch(authFail(err));
            if (err.message.includes("400")) {
                message.error("Username or password is incorrect!")
            } else if (err.message.includes("500")) {
                message.error("Sorry, server error has occured. Please, try again later.")
            } else {
                message.error("Error has occured. Try again.")
                console.log(err)
            }
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
            const token = res.data.key;
            console.log(token)
            // localStorage.setItem('token', token);                        
            // dispatch(authSuccess(token, username));
            // message.info(`Welcome, ${username}`);
        })
        .catch(err => {
            dispatch(authFail(err))
            if (err.message.includes("400")) {
                message.error("Email is already registred.")
            } else if (err.message.includes("500")) {
                message.error("Sorry, server error has occured. Please, try again later.")
            } else {
                message.error("Error has occured. Try again.")
                console.log(err)
            }
        })
    }
}