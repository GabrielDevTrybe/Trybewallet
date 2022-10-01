// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { WALLET_PRODUCTS } from '../actions';

const INITIAL_STATE_WALLET = {
  loading: false,
  currencies: [],
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case WALLET_PRODUCTS:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
