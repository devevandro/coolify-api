const axios = require('axios');
const core = require('@actions/core');

module.exports = async ({ github, context, core }) => {
  try {
    const coolifyUrl = process.env.COOLIFY_URL;
    const coolifyToken = process.env.COOLIFY_TOKEN;
    const appId = process.env.APP_UUID;
    const secrets = process.env.SECRETS;
    console.log('secrets', secrets);

    if (!coolifyUrl || !coolifyToken || !appId) {
      throw new Error('Missing required environment variables');
    }

    const api = axios.create({
      baseURL: coolifyUrl,
      headers: {
        'Authorization': `Bearer ${coolifyToken}`,
        'Content-Type': 'application/json'
      }
    });

    // 1. Atualizar as variáveis de ambiente (ENVs)
    console.log('Updating environment variables...');
    // const envUpdate = await api.post(`/api/v1/applications/${appId}/environment`, {
    //   environment: {
    //     // Adicione suas variáveis de ambiente aqui
    //     NODE_ENV: 'production',
    //     // ... outras variáveis
    //   }
    // });

    // if (envUpdate.status !== 200) {
    //   throw new Error('Failed to update environment variables');
    // }

    // 2. Reiniciar a aplicação
    console.log('Restarting application...');
    // const restart = await api.post(`/api/v1/applications/${appId}/restart`);

    // if (restart.status !== 200) {
    //   throw new Error('Failed to restart application');
    // }

    console.log('Deploy completed successfully!');

  } catch (error) {
    core.setFailed(`Deployment failed: ${error.message}`);
    throw error;
  }
};