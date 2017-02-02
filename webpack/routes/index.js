import React from 'react'

import Dashboard from '../containers/dashboard'

export default [
  { path: '/', component: Dashboard },
  { path: '*', component: () => (<span>404<br />Page not found</span>) }
]
