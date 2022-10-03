import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    submitDisable: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => this.handleValidate());
  };

  handleValidate = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const passLength = 5;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > passLength;
    this.setState({ submitDisable: !(verifyEmail && verifyPassword) });
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { submitDisable } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            data-testid="email-input"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ submitDisable }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
