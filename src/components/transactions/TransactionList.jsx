import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>Belum ada transaksi. Yuk tambahkan transaksi pertamamu!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((trx) => (
        <TransactionItem
          key={trx.id}
          transaction={trx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TransactionList