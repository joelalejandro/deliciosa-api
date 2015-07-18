'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fortune = require('fortune');

var _fortune2 = _interopRequireDefault(_fortune);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var store = _fortune2['default'].create({ serializers: [{ type: _fortune2['default'].serializers.JSONAPI }] });

store.defineType('dishType', {
  name: { type: String },
  dishes: { link: 'dish', isArray: true, inverse: 'dishType' }
});

store.defineType('dish', {
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  dishType: { link: 'dishType', isArray: false, inverse: 'dishes' },
  ingredients: { link: 'ingredient', isArray: true, inverse: 'dishes' }
});

store.defineType('ingredient', {
  name: { type: String },
  dishes: { link: 'dish', isArray: true, inverse: 'ingredients' }
});

var server = (0, _express2['default'])();

server.use((0, _cors2['default'])());
server.use(_fortune2['default'].net.http(store));
server.listen(1337);
