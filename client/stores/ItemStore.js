var _ = require('lodash');

var alt = require('../alt.js');
var ItemActions = require('../actions/ItemActions.js');

function ItemStore() {
  this.items = [];
  this.cart = [];

  this.bindListeners({
    handleAddToCart: ItemActions.ADD_TO_CART,
    handleRemoveFromCart: ItemActions.REMOVE_FROM_CART,
    handleIncreaseItem: ItemActions.INCREASE_ITEM,
    handleDecreaseItem: ItemActions.DECREASE_ITEM,
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
    item.qty++;
  },

  handleRemoveFromCart(item) {
    _.remove(this.cart, item);
    item.inCart = false;
    item.qty = 0;
  },

  handleIncreaseItem(item) {
    item.qty++;
  },

  /**
   * Decrease item serves double duty b/c if the item qty drops below 1 we want
   * to remove it from cart. Another option would be to disable decreasing an
   * item if the qty goes to 1, but I like this option. More intuitive.
   */
  handleDecreaseItem(item) {
    if (item.qty <= 1)
      this.handleRemoveFromCart(item);
    else
      item.qty--;
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
