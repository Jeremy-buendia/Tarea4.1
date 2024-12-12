/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

let concesionarios = [
  {
    nombre: "Accimovil",
    direccion: "Avda. Buenos Aires, 7, 18500 Guadix",
    coches: [
      { modelo: "Volkswagen Golf ", cv: 130, precio: 31000 },
      { modelo: "Toyota Corolla", cv: 140, precio: 29500 },
      { modelo: "Hyundai i30", cv: 160, precio: 28000 },
    ],
  },
  {
    nombre: "Autoarrayán",
    direccion: "Avda. Fernando de los Ríos 110, 18100 Armilla",
    coches: [
      { modelo: "Seat Ateca", cv: 150, precio: 33000 },
      { modelo: "Hyundai Tucson", cv: 230, precio: 37000 },
      { modelo: "Kia Sportage", cv: 265, precio: 44000 },
    ],
  },
  {
    nombre: "Auto Baez",
    direccion: "Calle Carril de Servicio A92 G, 4, 18320 Santa Fe",
    coches: [
      { modelo: "Ford Mustang", cv: 290, precio: 50000 },
      { modelo: "BMW Z4", cv: 197, precio: 55000 },
      { modelo: "Porsche 718", cv: 300, precio: 67000 },
    ],
  },
  {
    nombre: "Autobox Granada",
    direccion: "Calle Asima 7, 18210 Peligros",
    coches: [
      { modelo: "Tesla Model 3", cv: 351, precio: 50990 },
      { modelo: "Volkswagen ID.4", cv: 299, precio: 53000 },
      { modelo: "Hyundai Ioniq 5", cv: 325, precio: 48500 },
    ],
  },
];

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Añadir un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizar un solo concesionario
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un concesionario
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter(
    (item) => concesionarios.indexOf(item) !== id
  );

  response.json({ message: "ok" });
});

// Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id]["coches"];
  response.json({ result });
});

// Añadir un nuevo coche a un concesionario pasado por id
app.post("/concesionarios/:id/coches", (request, response) => {
  const id = request.params.id;
  concesionarios[id].coches.push(request.body);
  response.json({ message: "ok" });
});

//Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  const result = concesionarios[id].coches[cocheId];
  response.json({ result });
});

// Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches[cocheId] = request.body;
  response.json({ message: "ok" });
});

// Borra el coche cuyo id sea cocheId, del concesionario pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[id].coches.splice(cocheId, 1);
  response.json({ message: "ok" });
});

// // Lista todos los coches
// app.get("/coches", (request, response) => {
//   response.json(coches);
// });

// // Añadir un nuevo coche
// app.post("/coches", (request, response) => {
//   coches.push(request.body);
//   response.json({ message: "ok" });
// });

// // Obtener un solo coche
// app.get("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   const result = coches[id];
//   response.json({ result });
// });

// // Actualizar un solo coche
// app.put("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   coches[id] = request.body;
//   response.json({ message: "ok" });
// });

// // Borrar un elemento del array
// app.delete("/coches/:id", (request, response) => {
//   const id = request.params.id;
//   coches = coches.filter((item) => coches.indexOf(item) !== id);

//   response.json({ message: "ok" });
// });
