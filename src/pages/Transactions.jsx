import { useState, useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import TransactionList from '../components/transactions/TransactionList'
import SearchFilterBar from '../components/transactions/SearchFilterBar'
import Modal from '../components/ui/Modal'
import TransactionForm from '../components/transactions/TransactionForm'

function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  // State untuk search & filter
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // useMemo supaya kalkulasi filter tidak diulang tiap render,
  // hanya dihitung ulang kalau salah satu dependency berubah
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((trx) => {
        // Filter berdasarkan tipe (income/expense/all)
        if (typeFilter !== 'all' && trx.type !== typeFilter) return false

        // Filter berdasarkan kategori
        if (categoryFilter !== 'all' && trx.category !== categoryFilter) return false

        // Search berdasarkan catatan (case-insensitive)
        if (searchTerm && !trx.note?.toLowerCase().includes(searchTerm.toLowerCase())) return false

        return true
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, typeFilter, categoryFilter, searchTerm])

  const handleOpenAdd = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleSubmit = (data) => {
    if (editingTransaction) {
      updateTransaction(data)
    } else {
      addTransaction(data)
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      deleteTransaction(id)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-slate-800">Riwayat Transaksi</h2>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-tosca text-white rounded-xl font-medium hover:bg-tosca-dark transition-colors"
        >
          + Tambah Transaksi
        </button>
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {/* Info jumlah hasil, membantu user tahu berapa transaksi yang cocok filter */}
      <p className="text-sm text-slate-400 mb-4">
        Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
      </p>

      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTransaction ? 'Edit Transaksi' : 'Tambah Transaksi'}
      >
        <TransactionForm
          key={editingTransaction?.id || 'new'}
          initialData={editingTransaction}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Transactions