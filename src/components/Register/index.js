import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Register = props => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [accountNumber, setAccNo] = useState('')
  const [message, setMessage] = useState('')

  const onRegisterAccount = () => {
    const newUser = {
      username,
      password,
      accountNumber,
      transactions: [],
      balance: 500,
    }
    const previousUsers = JSON.parse(localStorage.getItem('users')) || []

    if (previousUsers.length === 0) {
      localStorage.setItem(
        'users',
        JSON.stringify([
          {
            username: 'sampleUser',
            password: 'sample123',
            accountNo: 123456,
            transactions: [
              {
                account: 'sample',
                uniqueId: 0,
                sentAccount: 'vijay',
                amount: 50,
              },
            ],
            balance: 100,
          },
          newUser,
        ]),
      )
      const latestUser = username
      setUser('')
      setPassword('')
      setAccNo('')
      const {history} = props
      history.replace('/', {latestUser})
    } else {
      const condition = previousUsers.some(each => each.username === username)
      if (condition) {
        setMessage('username is already taken')
      } else {
        localStorage.setItem(
          'users',
          JSON.stringify([...previousUsers, newUser]),
        )
        const latestUser = username
        setUser('')
        setPassword('')
        setAccNo('')
        const {history} = props
        history.replace('/', {latestUser})
      }
    }
  }

  return (
    <div className="register-cont">
      <h1>Register Account</h1>
      <div>
        <label htmlFor="account">Account No</label>
        <input
          type="number"
          value={accountNumber}
          id="account"
          placeholder="Account Number"
          onChange={event => setAccNo(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="user">Username</label>
        <input
          type="text"
          value={username}
          id="user"
          placeholder="Username"
          onChange={event => setUser(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          value={password}
          id="pass"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className="buttons-container">
        <button type="button" onClick={onRegisterAccount}>
          Register
        </button>
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>

      <p className="error">{message}</p>
    </div>
  )
}

export default Register
