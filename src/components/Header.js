import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalField = () => {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((e) => {
      const convert = e.theApi[e.moeda].ask;
      sum += e.despesa * convert;
    });
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <p data-testid="total-field">{ this.totalField() }</p>
        <p data-testid="header-currency-field">BRL</p>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,

}.isRequired;
