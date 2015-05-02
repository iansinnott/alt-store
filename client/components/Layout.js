'use strict';

var React = require('react');
var { RouteHandler, Link } = require('react-router');

require('./Layout.styl');
require("font-awesome-webpack");

var ItemStore = require('../stores/ItemStore.js');
var ItemActions = require('../actions/ItemActions.js');
var utils = require('../lib/utils.js');

var CartMiniDisplay = React.createClass({

  render() {
    var totalQty = this.props.cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);

    var totalPrice = utils.formatMoney(utils.getTotal(this.props.cart));

    return (
      <span className='CartMiniDisplay'>
        <i className="fa fa-shopping-cart" />
        <span className='totalQty'>{totalQty}</span>
        <span className='total'>${totalPrice}</span>
      </span>
    );
  }

});

/**
 * @module Layout
 */
module.exports = React.createClass({

  getInitialState() {
    return ItemStore.getState();
  },

  componentDidMount() {
    ItemStore.listen(this._onChange);
    ItemActions.fetchItems();
  },

  componentWillUnmount() {
    ItemStore.unlisten(this._onChange);
  },

  render() {
    return (
      <div className='Layout'>
        <header className="header">
          <div className="container">
            <Link className="site-name" to='items'>Super Store</Link>
            <nav>
              <ul>
                <li><Link to='items'>Shop</Link></li>
                <li>
                  <Link to='cart'>
                    Cart
                    <CartMiniDisplay cart={this.state.cart} />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container">
          <RouteHandler
            items={this.state.items}
            cart={this.state.cart}
            {...this.props} />
        </div>
      </div>
    );
  },

  _onChange(state) {
    this.setState(state);
  }

});

