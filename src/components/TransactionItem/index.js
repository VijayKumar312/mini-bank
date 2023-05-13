import './index.css'

const TransactionItem = ({transaction}) => {
  const {account, sentAccount, amount, balance} = transaction
  return (
    <li className="item">
      <p>{account}</p>
      <p>{sentAccount}</p>
      <p>{amount}</p>
      <p>{balance}</p>
    </li>
  )
}

export default TransactionItem
