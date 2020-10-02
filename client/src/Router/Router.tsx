import React from 'react'
import {
  BrowserRouter,
  Switch
} from 'react-router-dom'

import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'

import AuthRoute from './AuthRoute'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path='/sign-in'>
          <Login />
        </AuthRoute>
        <AuthRoute path='/sign-up'>
          <SignUp />
        </AuthRoute>
        <AuthRoute path='/' auth>
          <Home />
        </AuthRoute>
      </Switch>
    </BrowserRouter>

  )
}

export default Router