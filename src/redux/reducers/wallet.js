// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { WALLET_FORM, WALLET_PRODUCTS, DELETE } from '../actions';

const INITIAL_STATE_WALLET = {
  loading: false,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case WALLET_PRODUCTS:
    return {
      ...state,
      currencies: action.payload,
      loading: true,
    };
  case WALLET_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],

    };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  default:
    return state;
  }
}

export default wallet;
