'use strict';

var React = require('react');
var debug = require('debug')('app:ItemDetails');
var _ = require('lodash');
var { Link } = require('react-router');

var ItemStore = require('../../stores/ItemStore.js');
var ItemActions = require('../../actions/ItemActions.js');
var { formatMoney } = require('../../lib/utils.js');
var CartButton = require('./CartButton.js');

require('./Item.styl');

/**
 * @module ItemDetails
 */
module.exports = React.createClass({

  /*
   * TODO: Dafuq. Where is the right place to get a single model?? Should I
   * query the store directly or should the whole collection be passed down to
   * every subcomponent that needs it from the original state-getter the layout?
   * Why is all of no one talking about best practices in making remote request
   * sand in routing in flux?
   */
  render() {
    var id = this.props.params.id;
    var item = _.filter(this.props.items, { _id: id })[0];

    // Short circuit if there is not yet a model to display
    if (!item) return <span className='temp'>Loading...</span>;

    // TODO: Do i need to use keys here? These are just paras
    var description = item.description.split("\n").map((para, i) => {
      return <p key={i}>{para}</p>;
    });

    return (
      <div className='ItemDetails'>
        <img src={item.thumbnail} />
        <p className='item-name'>{item.name}</p>
        <p className="price">${formatMoney(item.price)}</p>
        {description}
        <CartButton item={item} onClick={this.addToCart.bind(this, item)} />
      </div>
    );
  },

  /**
   * Note: This is dulpicated in ItemList. However it's so simple, is it really
   * a good candidate for DRYing out?
   */
  addToCart(item, e) {
    ItemActions.addToCart(item);
  }

});

