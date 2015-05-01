var _ = require('lodash');

var alt = require('../alt.js');
var ItemActions = require('../actions/ItemActions.js');

function ItemStore() {
  this.items = [];
  this.cart = [];

  this.bindListeners({
    handleAddToCart: ItemActions.ADD_TO_CART,
    handleRemoveFromCart: ItemActions.REMOVE_FROM_CART,
    handleUpdateItems: ItemActions.UPDATE_ITEMS,
    handleUpdateFailed: ItemActions.UPDATE_FAILED
  });
}

_.extend(ItemStore.prototype, {

  handleAddToCart(item) {

    // Don't add the item to the cart if it's already there.
    if (_.contains(this.cart, item)) return;

    this.cart.push(item);
    item.inCart = true;
  },

  handleRemoveFromCart(item) {
    _.remove(this.cart, item);
    item.inCart = false;
  },

  handleUpdateItems(items) {
    this.items = items;
  },

  /**
   * TODO: Actually handle errors
   */
  handleUpdateFailed(message) {

    // Not really sure what to do in this case. For now just log it and move on.
    console.error(message);
  }

});

module.exports = alt.createStore(ItemStore, 'ItemStore');
