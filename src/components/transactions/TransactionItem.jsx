import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import CategoryBadge from './CategoryBadge'

function TransactionItem({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CategoryBadge categoryId={transaction.category} />
          <span className="text-xs text-slate-400">{formatDate(transaction.date)}</span>
        </div>
        {transaction.note && (
          <p className="text-sm text-slate-500 truncate">{transaction.note}</p>
        )}
      </div>

      <div className="flex items-center gap-4 ml-4">
        <span className={`font-heading font-semibold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-slate-400 hover:text-tosca hover:bg-tosca-light rounded-lg transition-colors"
            aria-label="Edit transaksi"
          >
            <LuPencil size={16} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            aria-label="Hapus transaksi"
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem