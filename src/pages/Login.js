import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EMAIL } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    submitDisable: true,
    email: '',
    handleChangePassword: '',
  };

  handleValidate = () => {
    const { email, handleChangePassword } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const maxLength = 6;
    if (regex.test(email) && handleChangePassword.length >= maxLength) {
      return this.setState({
        submitDisable: false,
      });
    }
    return this.setState({
      submitDisable: true,
    });
  };

  handleChangeEm = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.handleValidate());
  };

  handleChangePass = ({ target }) => {
    const { value } = target;
    this.setState({
      handleChangePassword: value,
    }, () => this.handleValidate());
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const action = { type: EMAIL, payload: { ...this.state } };
    dispatch(action);
    history.push('/carteira');
  };

  render() {
    const { submitDisable, handleChangeEmail, handleChangePassword } = this.state;
    return (
      <div>
        <label htmlFor="Login">
          Email:
          <input
            data-testid="email-input"
            type="text"
            onChange={ this.handleChangeEm }
            value={ handleChangeEmail }
          />
        </label>
        <label htmlFor="Login">
          Password:
          <input
            data-testid="password-input"
            type="password"
            onChange={ this.handleChangePass }
            value={ handleChangePassword }
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
  history: PropTypes.isRequired,
  dispatch: PropTypes.isRequired,
};
