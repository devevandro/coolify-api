import { Router, Request, Response } from "express";
import { CoolifyBaseApi } from "../../base";
import { ENVIRONMENTS } from "../../constants";
import { parseEnvString } from "../../utils";

export const router = Router();
const baseApi = new CoolifyBaseApi();
const api = baseApi.api;

router.get("/applications", async (_, res: Response) => {
  const response = await api.get("/applications");
  res.send({ data: response.data, status: 200 });
});

router.get("/applications/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const response = await api.get(`/applications/${uuid}`);
  res.send({ data: response.data, status: 200 });
});

router.post("/applications", async (req: Request, res: Response) => {
  const { PROJECT_UUID, SERVER_UUID, GITHUB_APP_UUID, ENVIRONMENT_NAME } =
    ENVIRONMENTS;
  const {
    git_repository,
    git_branch,
    ports_exposes,
    build_pack,
    domains,
    name,
  } = req.body;
  const body = {
    project_uuid: PROJECT_UUID,
    server_uuid: SERVER_UUID,
    github_app_uuid: GITHUB_APP_UUID,
    environment_name: ENVIRONMENT_NAME,
    git_repository,
    git_branch,
    ports_exposes,
    build_pack,
    domains,
    name,
  };

  try {
    const response = await api.post(`/applications/private-github-app`, body);
    res.send({ data: response.data, status: 200 });
  } catch (error) {
    res.send({ error, status: 500 });
  }
});

router.patch("/applications/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { envs } = req.body;;
  const body = {
    "data": parseEnvString(envs),
  };

  const response = await api.patch(`/applications/${uuid}/envs/bulk`, body);
  res.send({ data: response.data, status: 200 });
});

router.post(
  "/applications/:uuid/restart",
  async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const response = await api.post(`/applications/${uuid}/restart`);
    res.send({ data: response.data, status: 200 });
  }
);
