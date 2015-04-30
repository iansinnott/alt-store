'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/flux-store');
mongoose.connection.on('error', function(err) { console.error(err.message); });

var itemSchema = new mongoose.Schema({
  name: String,
  thumbnail: String, // URL of thumb
  price: Number, // Price in cents
  qty: { type: Number, default: 0 },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var Item = mongoose.model('Item', itemSchema);

// Fixtures. In a live app we would use dynamic data.
var ITEMS = [
  {
    name: 'MongoDB',
    thumbnail: 'http://www.mongodb.org/static/images/mongodb-logo.png',
    price: 3000,
    description: "This is an amazing item. It's the most base-ey database out there. Super duper mongo rager\nHey new line mongo rager."
  },{
    name: 'Groupon',
    thumbnail: 'http://upload.wikimedia.org/wikipedia/en/thumb/1/10/Groupon_logo.svg/1280px-Groupon_logo.svg.png',
    price: 2000,
    description: "Groupon is a company that does stuff and things. Who knew you couold just buy this company?\nIt all started back in some old time when things were extremely funny."
  },{
    name: 'RethinkDB',
    thumbnail: 'https://platzi.com/blog/content/images/2015/03/rethinkdb.png',
    price: 2200,
    description: "This is an amazing item. It's the most base-ey database out there. Super duper mongo rager\nHey new line mongo rager."
  },{
    name: 'Riak',
    thumbnail: 'http://blog.trifork.com/wp-content/uploads/2013/06/Riak_product_logo.png',
    price: 1755,
    description: "This is an amazing item. It's the most base-ey database out there. Super duper mongo rager\nHey new line mongo rager."
  },{
    name: 'MySQL',
    thumbnail: 'http://www.arvixe.com/images/landing_pages/mysql_hosting.png',
    price: 1007,
    description: "Such an old school database, but we can't deny that it can get the job done.\nWhy is everyone talking about postgress? "
  }
];

// Add all the fixtures
ITEMS.forEach(function(data) {

  // If fixture already exists do nothing
  Item.find(data, function(err, records) {
    if (records.length) return;
    var item = new Item(data);
    item.save();
  });
});

router.get('/', function(req, res) {
  res.json({ success: true, message: 'You made it!' });
});

router.get('/items', function(req, res, next) {
  Item.find({}, function(err, data) {
    if (err) next(err);
    res.json(data);
  });
});

router.post('/items/new', function(req, res, next) {
  var data = _.pick(req.params, ['name', 'thumbnail', 'description']);
  var item = new Item(data);
  item.save().then(function(data) {
    res.json({ success: true, data: data });
  }, next);
});

module.exports = router;

