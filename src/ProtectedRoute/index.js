import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const usersList = JSON.parse(localStorage.getItem('users'))
  if (usersList.length === 0) {
    return <Redirect to="/login" />
  }
  const {location} = props
  const {state = {}} = location
  const {latestUser} = state
  const authorisedUser = usersList.some(each => each.username === latestUser)

  if (authorisedUser) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
