var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var Layout = require('./components/Layout.js');
var ItemList = require('./components/Items/ItemList.js');
var ItemDetails = require('./components/Items/ItemDetails.js');

var Home = React.createClass({

  render() {
    return (
      <div className='Home'>
        <span className='temp'>Home</span>
      </div>
    );
  }

});

var Cart = React.createClass({

  render() {
    return (
      <div className='Cart'>
        <span className='temp'>Cart</span>
      </div>
    );
  }

});

// Routes
module.exports = (
  <Route path='/' handler={Layout}>
    <DefaultRoute name='items' handler={ItemList} />
    <Route name='item-details' path='items/:id' handler={ItemDetails} />
    <Route name='cart' handler={Cart} />
  </Route>
);
