import fortune from 'fortune';  // la magia de la API
import express from 'express';  // el servidor
import cors from 'cors';        // permite aceptar peticiones crossdomain

// Vamos a usar JSON API, en concordancia con lo que Ember Data 1.13 espera.
const store = fortune.create({ serializers: [{type: fortune.serializers.JSONAPI}] });

// El modelo dishType define un tipo de plato.
// Indica si el plato es una entrada, un aperitivo, un plato principal, etc.
store.defineType('dishType', {
  // Nombre del tipo de plato.
  name: { type: String },
  // Permite obtener todos los platos de este tipo.
  dishes: { link: 'dish', isArray: true, inverse: 'dishType' }
});

// El modelo dish define al plato en sí mismo.
// Contiene el registro de todos los platos disponibles. Cada plato posee un
// nombre, una descripción, un precio, una lista de ingredientes y un tipo de plato.
store.defineType('dish', {
  // Nombre del plato.
  name: { type: String },
  // Descripción breve del plato.
  description: { type: String },
  // Precio del plato.
  price: { type: Number },
  // Establece el tipo de plato.
  dishType: { link: 'dishType', isArray: false, inverse: 'dishes' },
  // Ingredientes usados.
  ingredients: { link: 'ingredient', isArray: true, inverse: 'dishes' }
});

// El modelo ingredient describe un ingrediente, con su nombre.
store.defineType('ingredient', {
  // Nombre del ingrediente.
  name: { type: String },
  // Permite obtener todos los platos que usan este ingrediente.
  dishes: { link: 'dish', isArray: true, inverse: 'ingredients' }
});

// Instanciar el servidor.
const server = express();

// Conectamos el soporte para CORS.
server.use(cors());

// Conectamos el store de la API al servidor.
server.use(fortune.net.http(store));

// Conectamos y...
store.connect().then(() => {
  // ...comienza la magia.
  server.listen(1337);
  console.log('Listening on http://localhost:1337.');
}).catch((e) => {
  // ...o no.
  console.log('Error: ' + JSON.stringify(e));
});
