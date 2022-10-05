import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, handleDelete } = this.props;

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>

            {expenses.map((expense) => {
              const { value, description,
                currency, method, tag, exchangeRates, id } = expense;
              const exchangeQuote = Number(exchangeRates[currency].ask);
              const conversion = exchangeQuote * value;
              const currencyName = (exchangeRates[currency].name);

              return (

                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeQuote.toFixed(2)}</td>
                  <td>{conversion.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      onClick={ () => handleDelete(id) }
                      data-testid="delete-btn"
                      type="button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;
