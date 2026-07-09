import { LuWallet, LuTrendingUp, LuTrendingDown } from 'react-icons/lu'
import { formatCurrency } from '../../utils/formatCurrency'

// Satu kartu generik -- dipakai 3x dengan config beda (saldo, income, expense)
function BalanceCard({ label, amount, icon: Icon, variant }) {
  const variantStyles = {
    balance: { bg: 'bg-tosca', iconBg: 'bg-white/20', text: 'text-white' },
    income: { bg: 'bg-white', iconBg: 'bg-emerald-100', text: 'text-slate-800' },
    expense: { bg: 'bg-white', iconBg: 'bg-rose-100', text: 'text-slate-800' },
  }
  const style = variantStyles[variant]
  const iconColor =
    variant === 'balance' ? 'text-white' : variant === 'income' ? 'text-emerald-600' : 'text-rose-600'

  return (
    <div className={`${style.bg} rounded-2xl p-6 shadow-sm ${variant !== 'balance' ? 'border border-slate-100' : ''}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm ${variant === 'balance' ? 'text-white/80' : 'text-slate-400'}`}>
          {label}
        </span>
        <div className={`${style.iconBg} p-2 rounded-xl`}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>
      <p className={`text-2xl font-heading font-bold mt-3 ${style.text}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  )
}

// Wrapper yang menyusun 3 kartu sekaligus
function BalanceSummary({ totalIncome, totalExpense, balance }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <BalanceCard label="Saldo Total" amount={balance} icon={LuWallet} variant="balance" />
      <BalanceCard label="Pemasukan" amount={totalIncome} icon={LuTrendingUp} variant="income" />
      <BalanceCard label="Pengeluaran" amount={totalExpense} icon={LuTrendingDown} variant="expense" />
    </div>
  )
}

export default BalanceSummary