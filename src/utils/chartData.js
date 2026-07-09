import { EXPENSE_CATEGORIES } from '../constants/categories'

// Mengelompokkan total expense per kategori -- untuk Pie Chart
export function getExpenseByCategory(transactions) {
  const expenseTransactions = transactions.filter((trx) => trx.type === 'expense')

  return EXPENSE_CATEGORIES
    .map((cat) => {
      const total = expenseTransactions
        .filter((trx) => trx.category === cat.id)
        .reduce((sum, trx) => sum + trx.amount, 0)

      return { name: cat.label, value: total, color: cat.color }
    })
    .filter((item) => item.value > 0) // buang kategori yang belum ada transaksinya
}

// Mengelompokkan total income & expense per bulan -- untuk Bar Chart
export function getMonthlyTrend(transactions) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

  // Grouping manual pakai object sebagai "map" bulan -> total
  const grouped = {}

  transactions.forEach((trx) => {
    const date = new Date(trx.date)
    const key = `${date.getFullYear()}-${date.getMonth()}` // contoh: "2026-6"

    if (!grouped[key]) {
      grouped[key] = {
        label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
        sortKey: date.getFullYear() * 12 + date.getMonth(),
        income: 0,
        expense: 0,
      }
    }

    if (trx.type === 'income') grouped[key].income += trx.amount
    else grouped[key].expense += trx.amount
  })

  // Urutkan berdasarkan waktu, ambil 6 bulan terakhir
  return Object.values(grouped)
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(-6)
}