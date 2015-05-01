// var _ = require('lodash');

var alt = require('../alt.js');
var ItemAPI = require('../lib/ItemAPI.js');

class ItemActions {

  /**
   * Add an item to the cart.
   */
  addToCart(item) {
    this.dispatch(item);
  }

  /**
   * Remove an item from the cart.
   */
  removeFromCart(item) {
    this.dispatch(item);
  }

  /**
   * Update all items. This will replace the existing items collection with the
   * new one passed to this func.
   */
  updateItems(items) {
    this.dispatch(items);
  }

  updateFailed(message) {
    this.dispatch(message);
  }

  /**
   * Go fetch all the items from the server.
   */
  fetchItems() {

    // We dispatch an event here so that we can have loading state.
    this.dispatch();

    // NOTE: This is one thing I really don't like about Alt so far. It's too
    // opaque and non-obvious what `this` will actually end up being after you
    // call createActions. In the function below if you call this.updateItems
    // you'll get an error, even though that would be totally fine in plain old
    // JS given this class and it's methods.
    ItemAPI.fetch((err, res) => {
      if (err)
        this.actions.updateFailed(err.message);
      else
        this.actions.updateItems(res.body); // Why the fuck not defined?
    });
  }

}

window.blarg = ItemActions;

module.exports = alt.createActions(ItemActions);
