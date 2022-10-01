import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletProducts } from '../redux/actions';

class WalletForm extends Component {
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

  render() {
    const arrayDropDown = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
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
            />
          </label>

          <label htmlFor="describe">
            describe
            <input
              data-testid="description-input"
              name="describe"
            />
          </label>

          <label htmlFor="moeda">
            moeda
            <select
              name="moeda"
              data-testid="currency-input"
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
            >
              {arrayDropDown.map((e, index) => (
                <option key={ index }>{e}</option>
              ))}
            </select>
          </label>

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
});

export default connect(mapStateToProps)(WalletForm);
