import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LuLayoutDashboard, LuListOrdered, LuMenu, LuX } from 'react-icons/lu'

const menuItems = [
  { label: 'Dashboard', path: '/', icon: LuLayoutDashboard },
  { label: 'Riwayat Transaksi', path: '/transactions', icon: LuListOrdered },
]

function Sidebar() {
  // Menentukan apakah sidebar mobile sedang terbuka
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Tombol hamburger -- hanya tampil di mobile (md:hidden) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-xl shadow-md"
        aria-label="Buka menu"
      >
        <LuMenu size={22} className="text-slate-700" />
      </button>

      {/* Overlay gelap saat sidebar mobile terbuka -- klik untuk menutup */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar itu sendiri:
          - Mobile: fixed, slide in/out dari kiri berdasarkan isOpen
          - Desktop (md:): selalu tampil statis, tidak perlu translate */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-tosca-dark">FundFlow</h1>
            <p className="text-xs text-slate-400 mt-1">Flow to Financial Freedom</p>
          </div>
          {/* Tombol close -- hanya tampil di mobile */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400">
            <LuX size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)} // tutup sidebar mobile setelah klik menu
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-tosca-light text-tosca-dark font-semibold'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar