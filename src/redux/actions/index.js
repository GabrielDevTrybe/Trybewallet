// Coloque aqui suas actions

const WALLET_PRODUCTS = 'WALLET_PRODUCTS';
const EMAIL = 'EMAIL';

export const walletProducts = (payload) => ({
  type: WALLET_PRODUCTS,
  payload,
});

export { WALLET_PRODUCTS, EMAIL };
