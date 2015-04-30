var _ = require('lodash');

var alt = require('../alt.js');
var ItemActions = require('../actions/ItemActions.js');

function ItemStore() {
  this.items = [];
  this.cart = [];

  this.bindListeners({
    handleAddToCart: ItemActions.ADD_TO_CART,
    handleUpdateItems: ItemActions.UPDATE_ITEMS,
    handleUpdateFailed: ItemActions.UPDATE_FAILED
  });
}

_.extend(ItemStore.prototype, {

  handleAddToCart(item) {
    this.items.push(item);
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
