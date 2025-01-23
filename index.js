const helmet = require("helmet");

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

//Importar las dependencias de MONGODB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Inicializamos la aplicación
const app = express();

app.use(helmet());

//URL de conexión
const uri =
  "mongodb+srv://jairo-cereceda:Tg6vkYV8xiTsTOId@cluster0.rrb32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );

//     //Podemos poner el código de la API
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

//Llamo a la funcion y run y me conecto a la base de datos
//run().catch(console.dir);
let db;

// Arrancamos la aplicación
app.listen(port, async () => {
  await client.connect();
  db = await client.db("concesionarios");

  console.log(`Servidor desplegado en puerto: ${port}`);
});

// let concesionarios = [
//   {
//     nombre: "Accimovil",
//     direccion: "Avda. Buenos Aires, 7, 18500 Guadix",
//     coches: [
//       { modelo: "Volkswagen Golf ", cv: 130, precio: 31000 },
//       { modelo: "Toyota Corolla", cv: 140, precio: 29500 },
//       { modelo: "Hyundai i30", cv: 160, precio: 28000 },
//     ],
//   },
//   {
//     nombre: "Autoarrayán",
//     direccion: "Avda. Fernando de los Ríos 110, 18100 Armilla",
//     coches: [
//       { modelo: "Seat Ateca", cv: 150, precio: 33000 },
//       { modelo: "Hyundai Tucson", cv: 230, precio: 37000 },
//       { modelo: "Kia Sportage", cv: 265, precio: 44000 },
//     ],
//   },
//   {
//     nombre: "Auto Baez",
//     direccion: "Calle Carril de Servicio A92 G, 4, 18320 Santa Fe",
//     coches: [
//       { modelo: "Ford Mustang", cv: 290, precio: 50000 },
//       { modelo: "BMW Z4", cv: 197, precio: 55000 },
//       { modelo: "Porsche 718", cv: 300, precio: 67000 },
//     ],
//   },
//   {
//     nombre: "Autobox Granada",
//     direccion: "Calle Asima 7, 18210 Peligros",
//     coches: [
//       { modelo: "Tesla Model 3", cv: 351, precio: 50990 },
//       { modelo: "Volkswagen ID.4", cv: 299, precio: 53000 },
//       { modelo: "Hyundai Ioniq 5", cv: 325, precio: 48500 },
//     ],
//   },
// ];

// Lista todos los concesionarios
app.get("/concesionarios", async (request, response) => {
  const concesionarios = await db
    .collection("concesionarios")
    .find({})
    .toArray();
  response.json(concesionarios);
});

// Añadir un nuevo concesionario
app.post("/concesionarios", async (request, response) => {
  await db.collection("concesionarios").insertOne(request.body);

  //concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", async (request, response) => {
  const id = new ObjectId(request.params.id);

  const concesionario = await db
    .collection("concesionarios")
    .find({ _id: id })
    .toArray();

  response.json({ concesionario });
});

// Actualizar un solo concesionario
app.put("/concesionarios/:id", async (request, response) => {
  const id = new ObjectId(request.params.id);
  await db
    .collection("concesionarios")
    .updateOne({ _id: id }, { $set: request.body });

  response.json({ message: "ok" });
});

// Borrar un concesionario
app.delete("/concesionarios/:id", async (request, response) => {
  const id = new ObjectId(request.params.id);
  await db.collection("concesionarios").deleteOne({ _id: id });

  response.json({ message: "ok" });
});

// Obtener todos los coches de un concesionario
app.get("/concesionarios/:id/coches", async (request, response) => {
  const id = new ObjectId(request.params.id);

  const concesionario = await db
    .collection("concesionarios")
    .findOne({ _id: id }, { projection: { coches: 1 } });

  response.json({ coches: concesionario.coches });
});

// Añadir un nuevo coche a un concesionario pasado por id
app.post("/concesionarios/:id/coches", async (request, response) => {
  const id = new ObjectId(request.params.id);
  const nuevoCoche = request.body;

  await db.collection("concesionarios").updateOne(
    { _id: new ObjectId(id) }, // Filtro por ID del concesionario
    { $push: { coches: nuevoCoche } } // Inserta el nuevo coche en el array
  );

  //concesionarios.push(request.body);
  response.json({ message: "ok" });
});

//Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const id = new ObjectId(request.params.id);
  const cocheId = parseInt(request.params.cocheId);

  const concesionario = await db
    .collection("concesionarios")
    .findOne({ _id: id }, { projection: { coches: 1 } });

  response.json(concesionario.coches[cocheId]);
});

// Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id
app.put("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const id = new ObjectId(request.params.id);
  const cocheId = parseInt(request.params.cocheId);
  const cocheKey = `coches.${cocheId}`;

  await db
    .collection("concesionarios")
    .updateOne({ _id: id }, { $set: { [cocheKey]: request.body } });

  response.json({ message: "ok" });
});

// Borra el coche cuyo id sea cocheId, del concesionario pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const id = new ObjectId(request.params.id);
  const cocheId = parseInt(request.params.cocheId);
  const cocheKey = `coches.${cocheId}`;

  await db
    .collection("concesionarios")
    .updateOne({ _id: id }, { $unset: { [cocheKey]: 1 } });

  await db
    .collection("concesionarios")
    .updateOne({ _id: id }, { $pull: { coches: null } });

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
