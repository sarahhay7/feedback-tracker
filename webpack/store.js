import { createApiMiddleware } from 'redux-jsonapi'
import { routerMiddleware } from 'react-router-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

export default function create (initialState, history) {
  const middleware = [
    createApiMiddleware('/api'),
    thunkMiddleware,
    routerMiddleware(history)
  ]
  const enhancer = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  return createStore(reducers, initialState, enhancer)
}
