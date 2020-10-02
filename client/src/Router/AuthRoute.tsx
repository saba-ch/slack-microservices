import { authHelper } from 'helpers'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface AuthRouteProps extends RouteProps {
  auth?: boolean
}

const AuthRoute: React.FC<AuthRouteProps> = ({ path, children, auth }) => {
  const isAuth = auth ? !!authHelper.getToken() : true

  return (
    <Route path={path}>
      {isAuth && (
        <>
          {children}
        </>
      )}
      {!isAuth && <Redirect to='/sign-in' />}
    </Route>
  )
}

export default AuthRoute