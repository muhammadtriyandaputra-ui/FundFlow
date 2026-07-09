export function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.payload]

    case 'UPDATE_TRANSACTION':
      return state.map((trx) =>
        trx.id === action.payload.id ? action.payload : trx
      )

    case 'DELETE_TRANSACTION':
      return state.filter((trx) => trx.id !== action.payload)

    default:
      return state
  }
}