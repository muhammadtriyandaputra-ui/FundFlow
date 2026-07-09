import { createContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { transactionReducer } from '../transactionReducer'
import useLocalStorage from '../hooks/useLocalStorage'

export const TransactionContext = createContext()

export function TransactionProvider({ children }) {
  const [storedTransactions, setStoredTransactions] = useLocalStorage('fundflow_transactions', [])
  const [transactions, dispatch] = useReducer(transactionReducer, storedTransactions)

  useEffect(() => {
    setStoredTransactions(transactions)
  }, [transactions, setStoredTransactions])

  const addTransaction = (data) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: { ...data, id: uuidv4(), createdAt: new Date().toISOString() },
    })
  }

  const updateTransaction = (data) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: data })
  }

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}