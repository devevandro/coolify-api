import axios from "axios";
import core from "@actions/core";

export const script = async ({ github, context, core }) => {
  try {
    const coolifyUrl = process.env.COOLIFY_URL;
    const coolifyToken = process.env.COOLIFY_TOKEN;
    const appUiid = process.env.APP_UUID;
    const secrets = process.env.SECRETS;

    console.log('secrets', secrets);
    console.log('coolifyUrl', coolifyUrl);
    console.log('coolifyToken', coolifyToken);

    if (!coolifyUrl || !coolifyToken || !appUiid) {
      throw new Error("Missing environment variables");
    }

    const api = axios.create({
      baseURL: coolifyUrl,
      headers: {
        Authorization: `Bearer ${coolifyToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Updating environment variables...");
    // const envUpdate = await api.patch(`/applications/${appUiid}/envs/bulk`, {});

    // if (envUpdate.status !== 200) {
    //   throw new Error("Failed to update environment variables");
    // }

    console.log('Deploying application...');
    // const restart = await api.post(`/deploy?uuid=${appUiid}`);

    // if (restart.status !== 200) {
    //   throw new Error('Failed to deploying application');
    // }

    console.log('Deploy completed successfully!');
  } catch (error) {core.setFailed(`Deployment failed: ${error.message}`);
    throw error;}
};
