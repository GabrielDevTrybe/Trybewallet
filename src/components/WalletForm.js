import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletProducts, walletExpense } from '../redux/actions';
import requestApi from '../services/requestApi';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.walletProducts();
  }

  walletProducts = async () => {
    const link = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(link);
    const data = await response.json();
    const { dispatch } = this.props;
    const removeUSDT = Object.keys(data).filter((curr) => curr !== 'USDT');
    dispatch(walletProducts(removeUSDT));
    console.log(this.props);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { dispatch, expenses } = this.props;
    const exchangeRates = await requestApi();
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      method,
      tag,
      currency,
      id: expenses.length,
      exchangeRates,
    };

    await dispatch(walletExpense(expense));
    this.setState({ value: '', description: '' });
  };

  render() {
    console.log(this.props);
    const arrayDropDown = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    const { currencies, loading } = this.props;

    if (!loading) {
      return <div>Carregando...</div>;
    }
    return (
      <div>

        <form>

          <label
            htmlFor="value"
          >
            despesa
            <input
              name="value"
              data-testid="value-input"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            describe
            <input
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            moeda
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((e, index) => (
                <option key={ index }>{e}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            pagamento
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              {arrayDropDown.map((e, index) => (
                <option key={ index }>{e}</option>
              ))}
            </select>
          </label>
          <button
            onClick={ this.handleSubmit }
            data-testid="add-expense"
            type="button"
          >
            Adicionar despesa
          </button>
        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
