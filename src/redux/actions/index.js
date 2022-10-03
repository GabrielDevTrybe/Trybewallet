// Coloque aqui suas actions
const WALLET_FORM = 'WALLET_FORM';
const WALLET_PRODUCTS = 'WALLET_PRODUCTS';
const EMAIL = 'EMAIL';

export const walletProducts = (payload) => ({
  type: WALLET_PRODUCTS,
  payload,
});

export const walletExpense = (expenses) => ({
  type: WALLET_FORM,
  payload: expenses,
});

export { WALLET_PRODUCTS, EMAIL, WALLET_FORM };
