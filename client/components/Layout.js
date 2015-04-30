'use strict';

var React = require('react');
var { RouteHandler, Link } = require('react-router');

require('./Layout.styl');
require("font-awesome-webpack");

/**
 * @module Layout
 */
module.exports = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
  },

  componentWillUnmount() {
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
                <li><Link to='cart'>Cart</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container">
          <RouteHandler
            {...this.props} />
        </div>
      </div>
    );
  }

});

