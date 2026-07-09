import { useState } from 'react'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories'

// initialData: kalau ada (mode edit), form terisi otomatis. Kalau null, berarti mode tambah baru
function TransactionForm({ initialData, onSubmit, onCancel }) {
  // Lazy initializer -- initialData dipakai langsung sebagai nilai awal, tanpa useEffect
  const [type, setType] = useState(initialData?.type || 'expense')
  const [category, setCategory] = useState(initialData?.category || '')
  const [amount, setAmount] = useState(initialData?.amount || '')
  const [date, setDate] = useState(
    initialData ? initialData.date.slice(0, 10) : new Date().toISOString().slice(0, 10)
  )
  const [note, setNote] = useState(initialData?.note || '')

  const categoryOptions = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!category || !amount || !date) {
      alert('Mohon lengkapi semua field yang wajib diisi')
      return
    }

    onSubmit({
      ...(initialData && { id: initialData.id, createdAt: initialData.createdAt }),
      type,
      category,
      amount: Number(amount),
      date: new Date(date).toISOString(),
      note,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Pilihan Tipe: Income / Expense */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => { setType('income'); setCategory('') }}
          className={`py-2.5 rounded-xl font-medium transition-colors ${
            type === 'income' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          Pemasukan
        </button>
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory('') }}
          className={`py-2.5 rounded-xl font-medium transition-colors ${
            type === 'expense' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          Pengeluaran
        </button>
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tosca"
        >
          <option value="">Pilih kategori</option>
          {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Nominal */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Nominal (Rp)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tosca"
        />
      </div>

      {/* Tanggal */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tosca"
        />
      </div>

      {/* Catatan */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Catatan (opsional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Contoh: Makan siang di kantor"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tosca resize-none"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-tosca text-white font-medium hover:bg-tosca-dark transition-colors"
        >
          {initialData ? 'Simpan Perubahan' : 'Tambah Transaksi'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm