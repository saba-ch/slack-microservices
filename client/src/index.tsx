import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import App from './App'
import client from './apollo'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)