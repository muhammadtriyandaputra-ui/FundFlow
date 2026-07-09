// Pure function -- hanya menerima array transaksi, mengembalikan hasil hitungan
export function calculateBalance(transactions) {
  const totalIncome = transactions
    .filter((trx) => trx.type === 'income')
    .reduce((sum, trx) => sum + trx.amount, 0)

  const totalExpense = transactions
    .filter((trx) => trx.type === 'expense')
    .reduce((sum, trx) => sum + trx.amount, 0)

  const balance = totalIncome - totalExpense

  return { totalIncome, totalExpense, balance }
}