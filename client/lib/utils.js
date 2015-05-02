/**
 * Utilities common to several parts of the app.
 */
module.exports = {

  formatMoney(cents) {
    return (cents / 100).toFixed(2);
  },

  getSubtotal(item) {
    return item.qty * item.price;
  },

  getTotal(cart) {
    return cart.reduce((sum, item) => {
      return sum + this.getSubtotal(item);
    }, 0);
  }

};
