const axios = require("axios");
const core = require("@actions/core");

module.exports = async ({ github, context }) => {
  try {
    const coolifyUrl = process.env.COOLIFY_URL;
    const coolifyToken = process.env.COOLIFY_TOKEN;
    const appUuid = process.env.COOLIFY_APP_UUID;
    const secrets = process.env.SECRETS || "{}";
    const exclude = process.env.EXCLUDE || [];

    if (!coolifyUrl || !coolifyToken || !appUuid) {
      throw new Error("Missing required environment variables");
    }

    const secretsParsed =
      typeof secrets === "string" ? JSON.parse(secrets) : secrets;

    const convertedJsonToArray = Object.entries(secretsParsed)
      .filter(([key]) => !exclude.includes(key))
      .map(([key, value]) => ({
        key,
        value
      }));

    const api = axios.create({
      baseURL: coolifyUrl,
      headers: {
        Authorization: `Bearer ${coolifyToken}`,
        "Content-Type": "application/json"
      }
    });

    // 1. Atualizar as variáveis de ambiente (ENVs)
    if (secretsParsed.length > 0) {
      console.log("Updating environment variables...");
      const body = {
        data: convertedJsonToArray
      };
      const envUpdate = await api.patch(
        `/applications/${appUuid}/envs/bulk`,
        body
      );

      if (envUpdate.status !== 201) {
        throw new Error("Failed to update environment variables");
      }

      console.log("Updated environment variables successfully!");
    }

    // 2. Reiniciar a aplicação
    console.log("Restarting application...");
    const restart = await api.post(`/deploy?uuid=${appUuid}`);

    if (restart.status !== 200) {
      throw new Error("Failed to restart application");
    }

    console.log("Deploy completed successfully!");
  } catch (error) {
    core.setFailed(`Deployment failed: ${error.message}`);
    throw error;
  }
};
