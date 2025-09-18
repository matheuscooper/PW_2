import { loadEnvs } from "./config/env";
import app from "./app";

const startServer = async () => {
  try {
    const envs = await loadEnvs();
    const PORT = parseInt(envs.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(
        `Servidor rodando na porta ${PORT}, http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor", error);
  }
};

startServer();
