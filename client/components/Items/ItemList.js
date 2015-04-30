'use strict';

var React = require('react');
var debug = require('debug')('app:ItemList');
var { Link } = require('react-router');

/**
 * @module ItemList
 */
module.exports = React.createClass({

  render() {
    var items = this.props.items.map((item, i) => {
      return (
        <li key={i} className='item'>
          <img src={item.thumbnail} />
          <p className='item-name'>{item.name}</p>
          <p className="price">{item.price}</p>
          <Link
            to='item-details'
            className='btn'
            params={{ id: item._id }}
            >Item Details</Link>
          <a class="btn">Add to cart</a>
        </li>
      );
    });

    return (
      <div className='ItemList'>
        {items}
      </div>
    );
  }

});

