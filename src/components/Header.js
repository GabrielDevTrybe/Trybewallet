import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { email: state.user.email };
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,

};
