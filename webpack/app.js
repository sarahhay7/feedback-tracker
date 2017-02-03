import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'font-awesome-sass-loader'

injectTapEventPlugin()

import routes from './routes'

export default function create (history, store) {
  const storeSyncedHistory = syncHistoryWithStore(history, store)

  return class App extends Component {
    render () {
      return (
        <MuiThemeProvider>
          <Provider store={store}>
            <Router history={storeSyncedHistory} routes={routes} />
          </Provider>
        </MuiThemeProvider>
      )
    }
  }
}
