// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL } from '../actions/index';

const INITIAL_STATE_USER = {
  email: '',
};

function userReducer(state = INITIAL_STATE_USER, action) {
  const test = { ...state, email: { ...action.payload } };
  console.log(test);

  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default userReducer;
