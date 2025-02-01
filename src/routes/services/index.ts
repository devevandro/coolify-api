import { Router, Request, Response } from "express";
import { CoolifyBaseApi } from "../../base";
import { ENVIRONMENTS } from "../../constants";

export const router = Router();
const baseApi = new CoolifyBaseApi();
const api = baseApi.api;

router.get("/services", async (_, res: Response) => {
  const response = await api.get("/services");
  res.send({ data: response.data, status: 200 });
});

router.post("/services", async (req: Request, res: Response) => {
  const { PROJECT_UUID, SERVER_UUID, GITHUB_APP_UUID, ENVIRONMENT_NAME } =
    ENVIRONMENTS;
  const {
    git_repository,
    git_branch,
    port_exposes,
    build_pack,
    domains,
    name,
  } = req.body;
  const body = {
    project_uuid: 'zcc888k880gsc8scso0ogkos',
    server_uuid: SERVER_UUID,
    environment_name: ENVIRONMENT_NAME,
    type: 'grafana',
    name: 'grafana-app',
  };

  try {
    const response = await api.post(`/services`, body);
    res.send({ data: response.data, status: 200 });
  } catch (error) {
    console.error(error);
    res.send({ error, status: 500 });
  }
});
