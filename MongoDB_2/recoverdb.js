const { MongoClient } = require('mongodb');

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main() {

  const uri = "mongodb+srv://josepepe1253_db_user:z7JYXIxyM5BPns15@cluster0.yevmhfs.mongodb.net/?appName=Cluster0";

  const client = new MongoClient(uri); // ← sin opciones viejas

  try {
    await client.connect();
    await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);