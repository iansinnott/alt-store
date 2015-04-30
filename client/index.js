var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, (Handler, state) => {
    React.render(<Handler params={state.params} />, document.body);
  });
});
