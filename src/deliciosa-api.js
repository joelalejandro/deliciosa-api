import fortune from 'fortune';
import express from 'express';
import cors from 'cors';

const store = fortune.create({ serializers: [{type: fortune.serializers.JSONAPI}] });

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

const server = express();

server.use(cors());
server.use(fortune.net.http(store));
store.connect().then(() => {
  console.log('Starting.');
  server.listen(1337);
});
