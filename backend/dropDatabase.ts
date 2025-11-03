import { Client } from "pg";

const DATABASE_URL = "postgresql://appuser:pw2@127.0.0.1:5432/appdb";
const adminUrl = DATABASE_URL.replace("/appdb", "/postgres");
const dbName = "appdb";

async function dropDatabase() {
  const client = new Client({ connectionString: adminUrl });
  try {
    await client.connect();

    // encerra conexões ativas no banco
    await client.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${dbName}' AND pid <> pg_backend_pid();
    `);

    // apaga o banco
    await client.query(`DROP DATABASE IF EXISTS ${dbName};`);
    console.log(`🗑️  Banco de dados "${dbName}" apagado com sucesso.`);
  } catch (err) {
    console.error("❌ Erro ao apagar banco:", err);
  } finally {
    await client.end();
  }
}

dropDatabase();
