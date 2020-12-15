import * as actionTypes from './actionTypes';

export const setTheme = (isDark) => {
    return {
        type: actionTypes.SWITCH_THEME,
        isDark: isDark
    };
}

export const themeSwitch = (isDark) => {
    return dispatch => {
        localStorage.setItem('isDark', isDark)
        dispatch(setTheme(isDark))
    }
}