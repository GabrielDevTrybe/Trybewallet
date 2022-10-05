const WALLET_FORM = 'WALLET_FORM';
const WALLET_PRODUCTS = 'WALLET_PRODUCTS';
const EMAIL = 'EMAIL';
const DELETE = 'DELETE';

export const login = (payload) => ({
  type: EMAIL,
  payload,
});

export const walletProducts = (payload) => ({
  type: WALLET_PRODUCTS,
  payload,
});

export const walletExpense = (expenses) => ({
  type: WALLET_FORM,
  payload: expenses,
});

export const deleteItem = (payload) => ({
  type: DELETE,
  id: payload,
});

export { WALLET_PRODUCTS, EMAIL, WALLET_FORM, DELETE };
