import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { apiReducer as api } from 'redux-jsonapi'

export default combineReducers({
  api,
  routing
})
