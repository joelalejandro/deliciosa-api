'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fortune = require('fortune');

var _fortune2 = _interopRequireDefault(_fortune);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var store = _fortune2['default'].create({ serializers: [{ type: _fortune2['default'].serializers.JSONAPI }] });

store.defineType('tipoPlato', {
  nombre: { type: String },
  platos: { link: 'plato', isArray: true, inverse: 'tipoPlato' }
});

store.defineType('plato', {
  nombre: { type: String },
  descripcion: { type: String },
  precio: { type: Number },
  tipoPlato: { link: 'tipoPlato', isArray: false, inverse: 'platos' },
  ingredientes: { link: 'ingrediente', isArray: true, inverse: 'platos' }
});

store.defineType('ingrediente', {
  nombre: { type: String },
  platos: { link: 'plato', isArray: true, inverse: 'ingredientes' }
});

var server = _http2['default'].createServer(_fortune2['default'].net.http(store));

store.connect().then(function () {
  server.listen(1337);
  console.log('Listening');
})['catch'](function (e) {
  console.log(JSON.stringify(e));
});
