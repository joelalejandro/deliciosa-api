import fortune from 'fortune';
import http from 'http';

const store = fortune.create({ serializers: [{type: fortune.serializers.JSONAPI}] });

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

const server = http.createServer(fortune.net.http(store));

store.connect().then(() => {
  server.listen(1337);
  console.log('Listening');
}).catch((e) => {
  console.log(JSON.stringify(e));
});
