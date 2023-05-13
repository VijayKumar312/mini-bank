import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import './index.css'

const Navbar = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <button className="logout-button" type="button" onClick={onLogOut}>
      Logout
    </button>
  )
}

export default withRouter(Navbar)
