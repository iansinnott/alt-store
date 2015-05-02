var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var Layout = require('./components/Layout.js');
var ItemList = require('./components/Items/ItemList.js');
var ItemDetails = require('./components/Items/ItemDetails.js');
var Cart = require('./components/Cart/Cart.js');

// Routes
module.exports = (
  <Route path='/' handler={Layout}>
    <DefaultRoute name='items' handler={ItemList} />
    <Route name='item-details' path='items/:id' handler={ItemDetails} />
    <Route name='cart' handler={Cart} />
  </Route>
);
