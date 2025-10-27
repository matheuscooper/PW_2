import { Client } from "pg";

const DATABASE_URL = "postgresql://appuser:pw2@127.0.0.1:5432/appdb";
const adminUrl = DATABASE_URL.replace("/appdb", "/postgres");
const dbName = "appdb";

async function createDatabase() {
  const client = new Client({ connectionString: adminUrl });
  try {
    await client.connect();

    // cria o banco se não existir
    await client.query(`CREATE DATABASE ${dbName};`);
    console.log(`✅ Banco de dados "${dbName}" criado com sucesso.`);
  } catch (err) {
    console.error("❌ Erro ao criar banco:", err);
  } finally {
    await client.end();
  }
}

createDatabase();
