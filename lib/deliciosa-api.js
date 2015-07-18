'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fortune = require('fortune');

var _fortune2 = _interopRequireDefault(_fortune);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

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

var server = _http2['default'].createServer(_fortune2['default'].net.http(store));

store.connect().then(function () {
  server.listen(1337);
  console.log('Listening');
})['catch'](function (e) {
  console.log(JSON.stringify(e));
});
