'use strict';

var React = require('react');
var debug = require('debug')('app:Cart');
var ItemActions = require('../../actions/ItemActions.js');

require('./Cart.styl');

var utils = require('../../lib/utils.js');

/**
 * @module Cart
 */
module.exports = React.createClass({

  render() {
    var items = this.props.cart.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item.name}</td>
            <td className='qty'>
            {item.qty}
            <button onClick={this.decreaseItem.bind(this, item)}>
              <i className="fa fa-minus" />
            </button>
            <button onClick={this.increaseItem.bind(this, item)}>
              <i className="fa fa-plus" />
            </button>
          </td>
          <td>${utils.formatMoney(item.price)}</td>
          <td>${utils.formatMoney(utils.getSubtotal(item))}</td>
          <td>
            <button
              className='remove'
              onClick={this.removeFromCart.bind(this, item)}>
              <i className="fa fa-times" />
            </button>
          </td>
        </tr>
      );
    });

    var total = utils.formatMoney(utils.getTotal(this.props.cart));

    return (
      <div className='Cart'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        <div className="total">${total}</div>
      </div>
    );
  },

  increaseItem(item) {
    ItemActions.increaseItem(item);
  },

  decreaseItem(item) {
    ItemActions.decreaseItem(item);
  },

  removeFromCart(item) {
    ItemActions.removeFromCart(item);
  }

});

