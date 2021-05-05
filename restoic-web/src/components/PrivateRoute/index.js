import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userLoggedIn } from '../../utils/loggedUser';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = userLoggedIn();
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

export default PrivateRoute