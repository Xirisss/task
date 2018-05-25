import React from "react"
import { Route } from 'react-router';

const RouteWithLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} issuesObj={rest.issuesObj} closeIssue={rest.closeIssue} />
    )}
  />
)

export default RouteWithLayout
