import { combineReducers } from 'redux'
import dodos from './dodos'
import addDodo from './addDodo'

export default combineReducers({
    dodos,
    addDodo
})