import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import TransactionItem from '../TransactionItem'

class Home extends Component {
  state = {
    account: '',
    amount: 0,
    message: '',
    balance: 1000,
    transactions: [],
    userId: '',
  }

  componentDidMount() {
    const {location} = this.props
    const {state} = location
    const {latestUser} = state
    const previousUsers = JSON.parse(localStorage.getItem('users')) || []
    const userDetails = previousUsers.find(each => each.username === latestUser)
    const {username, transactions, balance} = userDetails
    if (transactions) {
      this.setState({userId: username, transactions, balance})
    }
    this.setState({userId: username})
  }

  handleAccountChange = event => {
    this.setState({account: event.target.value})
  }

  addTransactionItem = () => {
    const {transactions, account, amount, balance, userId} = this.state
    const newArray = {
      uniqueId: transactions.length,
      account: userId,
      sentAccount: account,
      amount,
      balance,
    }
    this.setState({
      transactions: [...transactions, newArray],
      amount: 0,
      account: '',
    })
  }

  handleAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onHandleWithdraw = () => {
    const {userId, username, balance, amount} = this.state
    if (userId !== username) {
      alert('enter your bank account name')
      return
    }
    if (balance < parseInt(amount)) {
      alert('You have insufficient balance')
      return
    }
    this.setState(
      prevState => ({
        balance: prevState.balance - parseInt(prevState.amount),
      }),
      this.addTransactionItem,
    )
  }

  onHandleDeposit = () => {
    const {userId, account, amount} = this.state

    if (userId !== account) {
      alert('You cannot deposit into others account.')
      return
    }
    this.setState(
      prevState => ({
        balance: prevState.balance + parseInt(amount),
      }),
      this.addTransactionItem,
    )
  }

  onHandleTransfer = () => {
    const {userId, account, balance, amount} = this.state

    if (userId === account) {
      alert('You cannot transfer money to your own account.')
      return
    }

    if (balance < parseInt(amount)) {
      alert('You have insufficient balance.')
      return
    }

    this.setState(
      prevState => ({
        balance: prevState.balance - parseInt(amount),
      }),
      this.addTransactionItem,
    )
  }

  onLogOut = () => {
    const {transactions, userId, balance} = this.state
    const previousUsers = JSON.parse(localStorage.getItem('users')) || []
    const userDetails = previousUsers.find(each => each.username === userId)
    const newUserData = {...userDetails, transactions, balance}
    const updatedUsers = previousUsers.map(user => {
      if (user.username === userId) {
        return newUserData
      }
      return user
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {amount, transactions, account, balance, message, userId} = this.state
    return (
      <div className="home-container">
        <div className="nav-bar">
          <button
            className="logout-button"
            type="button"
            onClick={this.onLogOut}
          >
            Logout
          </button>
        </div>
        <div className="account-details">
          <h1>Mini Bank Application</h1>
          <div>
            <p>AccountName: {userId}</p>
            <p>
              Balance: <span>{balance}</span>
            </p>
          </div>
          <div>
            <label htmlFor="userAccount">Account:</label>
            <input
              id="userAccount"
              value={account}
              onChange={this.handleAccountChange}
            />
          </div>
          <div>
            <label htmlFor="userAmount">Amount:</label>
            <input
              id="userAmount"
              value={amount}
              onChange={this.handleAmountChange}
            />
          </div>

          <button
            className="tbutton"
            type="button"
            onClick={this.onHandleWithdraw}
          >
            Withdraw
          </button>
          <button
            className="tbutton"
            type="button"
            onClick={this.onHandleDeposit}
          >
            Deposit
          </button>
          <button
            className="tbutton"
            type="button"
            onClick={this.onHandleTransfer}
          >
            Transfer
          </button>
          <div>{message}</div>
        </div>
        <div className="transaction-details">
          <div className="transactions-heading">
            <h1 className="heading1">Account</h1>
            <h1>Sent Account</h1>
            <h1>Amount</h1>
            <h1>Balance</h1>
          </div>
          <ul className="transaction-list">
            {transactions.length > 0 &&
              transactions.map(each => (
                <TransactionItem key={each.uniqueId} transaction={each} />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
