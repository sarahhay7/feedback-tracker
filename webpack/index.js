import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory as history } from 'react-router'

import { default as createApp } from './app'
import { default as createStore } from './store'

const initialState = {
  api: {
    customers: {},
    feedbacks: {},
    feedbackStates: {},
    tickets: {}
  }
}

const store = createStore(initialState, history)
const App = createApp(history, store)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
