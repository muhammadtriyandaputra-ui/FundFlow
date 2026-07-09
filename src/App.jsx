import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TransactionProvider } from './context/TransactionContext'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          {/* pt-16 di mobile supaya konten tidak tertutup tombol hamburger, md:pt-0 karena di desktop tidak ada hamburger */}
          <main className="flex-1 bg-slate-50 min-h-screen pt-16 md:pt-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TransactionProvider>
  )
}

export default App