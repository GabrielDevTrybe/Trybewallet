import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletProducts, walletExpense } from '../redux/actions';
import requestApi from '../services/requestApi';

class WalletForm extends Component {
  state = {
    despesa: '',
    describe: '',
    moeda: 'USD',
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
    const theApi = await requestApi();
    const { despesa, describe, moeda, method, tag } = this.state;
    const expense = {
      despesa,
      describe,
      method,
      tag,
      moeda,
      id: expenses.length,
      theApi,
    };

    await dispatch(walletExpense(expense));
    this.setState({ despesa: '', describe: '' });
  };

  render() {
    console.log(this.props);
    const arrayDropDown = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { despesa, describe, moeda, method, tag } = this.state;
    const { currencies, loading } = this.props;

    if (!loading) {
      return <div>Carregando...</div>;
    }
    return (
      <div>

        <form>

          <label
            htmlFor="despesa"
          >
            despesa
            <input
              name="despesa"
              data-testid="value-input"
              type="text"
              value={ despesa }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="describe">
            describe
            <input
              data-testid="description-input"
              name="describe"
              value={ describe }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="moeda">
            moeda
            <select
              name="moeda"
              data-testid="currency-input"
              value={ moeda }
              onChange={ this.handleChange }
            >
              {currencies.map((e, index) => (
                <option key={ index }>{e}</option>
              ))}
            </select>
          </label>

          <label htmlFor="pagamento">
            pagamento
            <select
              name="pagamento"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="dropdown">
            <select
              name="dropdown"
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
