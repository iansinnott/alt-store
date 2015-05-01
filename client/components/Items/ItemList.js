'use strict';

var React = require('react');
var debug = require('debug')('app:ItemList');
var { Link } = require('react-router');

var ItemActions = require('../../actions/ItemActions.js');
var { formatMoney } = require('../../lib/utils.js');
var CartButton = require('./CartButton.js');

/**
 * @module ItemList
 */
module.exports = React.createClass({

  render() {
    var items = this.props.items.map((item, i) => {
      return (
        <li key={i} className='item'>
          <img src={item.thumbnail} />
          <p className='item-name'>{item.name}</p>
          <p className="price">${formatMoney(item.price)}</p>
          <Link
            to='item-details'
            className='btn'
            params={{ id: item._id }}
            >Item Details</Link>
          <CartButton item={item} onClick={this.addToCart.bind(this, item)} />
        </li>
      );
    });

    return (
      <div className='ItemList'>
        {items}
      </div>
    );
  },

  /**
   * We do validation to make sure the item isn't already in the sture in the
   * store itself, so we don't need to do any checking here.
   */
  addToCart(item, e) {
    ItemActions.addToCart(item);
  }

});

