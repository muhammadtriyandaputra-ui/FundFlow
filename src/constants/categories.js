export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Gaji', color: '#10B981' },
  { id: 'bonus', label: 'Bonus', color: '#14B8A6' },
  { id: 'investment', label: 'Investasi', color: '#0EA5E9' },
  { id: 'other_income', label: 'Lainnya', color: '#64748B' },
]

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Makanan', color: '#F43F5E' },
  { id: 'transport', label: 'Transportasi', color: '#F59E0B' },
  { id: 'shopping', label: 'Belanja', color: '#EC4899' },
  { id: 'bills', label: 'Tagihan', color: '#8B5CF6' },
  { id: 'entertainment', label: 'Hiburan', color: '#F97316' },
  { id: 'other_expense', label: 'Lainnya', color: '#64748B' },
]

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]