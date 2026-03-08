const { MongoClient } = require('mongodb');

function iterateFunc(doc) {
   console.log(JSON.stringify(doc, null, 4));
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function findAllData(client) {
  const cursor = await client
    .db("sample_mflix")
    .collection("movies")
    .find({})
    .limit(2);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log("Title:", results[0].title);
  }

  console.log("Películas encontradas:");
  console.log(JSON.stringify(results, null, 2));
}

async function main() {

  const uri = "mongodb+srv://nsierrar:kasPQXbv648FvVxT@cluster0.k84ecox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {

    // Conectarse a MongoDB
    await client.connect();
    console.log("Conectado a MongoDB");

    // Listar bases de datos
    await listDatabases(client);

    // Buscar datos
    await findAllData(client);

  } catch (e) {
    console.error(e);
  } finally {

    // Cerrar conexión
    await client.close();
    console.log("Conexión cerrada");

  }
}

main().catch(console.error);