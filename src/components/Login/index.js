import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const history = useHistory()

  const onFormSubmit = event => {
    event.preventDefault()
    const usersList = JSON.parse(localStorage.getItem('users')) || []

    if (usersList.length === 0) {
      setErrMsg(
        'Could not recognize account. Please register if you are a new user or enter correct details.',
      )
    } else {
      const loginUser = usersList.find(user => user.username === username)
      if (loginUser) {
        if (loginUser.password === password) {
          history.replace('/', {latestUser: username})
        } else {
          setErrMsg('Enter Correct Password')
        }
      } else {
        setErrMsg(
          'Could not recognize account. Please register if you are a new user or enter correct details.',
        )
      }
    }
  }

  return (
    <div className="login-container">
      <div>
        <label htmlFor="userid">Enter Username</label>
        <input
          type="text"
          value={username}
          onChange={event => {
            setUsername(event.target.value)
            setErrMsg('') // Reset error message
          }}
          placeholder="Username"
        />
      </div>

      <div>
        <label htmlFor="passid">Enter Password</label>
        <input
          id="passid"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
        />
      </div>

      <div className="btns-container">
        <button type="submit" className="button" onClick={onFormSubmit}>
          Login
        </button>
        <Link to="/register" className="button">
          Register
        </Link>
      </div>

      {errMsg && <p className="errorMsg">{errMsg}</p>}
    </div>
  )
}

export default Login
