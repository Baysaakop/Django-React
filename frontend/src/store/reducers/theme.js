import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isDark: localStorage.getItem('isDark')
}

const switchTheme = (state, action) => {
    return updateObject(state, {        
        isDark: action.isDark
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SWITCH_THEME:
            return switchTheme(state, action)
        default:
            return state
    }        
}

export default reducer;