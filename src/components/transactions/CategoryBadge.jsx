import { ALL_CATEGORIES } from '../../constants/categories'

// Menampilkan label kategori dengan warna kecil sesuai kategori tersebut
function CategoryBadge({ categoryId }) {
  const category = ALL_CATEGORIES.find((cat) => cat.id === categoryId)
  if (!category) return null

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{ backgroundColor: `${category.color}20`, color: category.color }}
    >
      {category.label}
    </span>
  )
}

export default CategoryBadge