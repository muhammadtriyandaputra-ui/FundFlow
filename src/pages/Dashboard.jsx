import { useState, useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { calculateBalance } from '../utils/calculateBalance'
import { getExpenseByCategory, getMonthlyTrend } from '../utils/chartData'
import Modal from '../components/ui/Modal'
import TransactionForm from '../components/transactions/TransactionForm'
import BalanceSummary from '../components/dashboard/BalanceCard'
import CategoryPieChart from '../components/dashboard/CategoryPieChart'
import MonthlyTrendChart from '../components/dashboard/MonthlyTrendChart'

function Dashboard() {
  const { transactions, addTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { totalIncome, totalExpense, balance } = calculateBalance(transactions)

  // useMemo supaya data grafik tidak dihitung ulang tiap render yang tidak perlu
  const expenseByCategory = useMemo(() => getExpenseByCategory(transactions), [transactions])
  const monthlyTrend = useMemo(() => getMonthlyTrend(transactions), [transactions])

  const handleAddTransaction = (data) => {
    addTransaction(data)
    setIsModalOpen(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-slate-800">Dashboard</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-tosca text-white rounded-xl font-medium hover:bg-tosca-dark transition-colors"
        >
          + Tambah Transaksi
        </button>
      </div>

      <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />

      {/* Grid grafik: 1 kolom di mobile, 2 kolom di layar besar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <MonthlyTrendChart data={monthlyTrend} />
        <CategoryPieChart data={expenseByCategory} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Transaksi">
        <TransactionForm
          key="new"
          initialData={null}
          onSubmit={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Dashboard