var React = require('react');
var classes = require('classnames');

/**
 * @module CartButton
 */
module.exports = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {

    var { item } = this.props;
    var text = item.inCart ? 'In cart' : 'Add to cart';

    var buttonClass = classes({
      'CartButton': true,
      btn: true,
      disabled: item.inCart
    });

    return <a className={buttonClass} {...this.props}>{text}</a>;
  }

});

