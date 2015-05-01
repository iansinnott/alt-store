/**
 * Utilities common to several parts of the app.
 */
module.exports = {
  formatMoney(cents) {
    return (cents / 100).toFixed(2);
  }
};
