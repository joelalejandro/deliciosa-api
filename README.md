# deliciosa-api
El backend para la demo app del Hackday Córdoba de Julio 2015.

## Dependencias

- fortune

## Para ejecutar desde Node

```bash
make
node lib/deliciosa-api.js
```

## Para ejecutar sin compilar (usando Babel)

```bash
babel-node src/deliciosa-api.js
```

## URL de la API

```
http://localhost:1337
```

## Estructuras de datos disponibles

- */tipoPlato:* Indica si el plato es una entrada, un aperitivo, un plato principal, etc.
  Se pueden obtener los platos de cada tipo haciendo `GET /tipoPlato/{id}/platos`.
- */platos:* Contiene el registro de todos los platos disponibles. Cada plato posee un
  nombre, una descripción, un precio, una lista de ingredientes y un tipo de plato.
  Se pueden obtener los ingredientes de cada plato haciendo `GET /platos/{id}/ingredientes`.
- */ingredientes:* Describe un ingrediente, con su nombre. Se pueden obtener los platos
  que utilizan cada ingrediente haciendo `GET /ingredientes/{id}/platos`.

## Integrando con Ember Data

En el JSONAPIAdapter de tu aplicación, establecer el argumento `host` con la URL de la API.
