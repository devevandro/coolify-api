import { Router, Request, Response } from "express";
import { CoolifyBaseApi } from "../../base";
import { ENVIRONMENTS } from "../../constants";

export const router = Router();
const baseApi = new CoolifyBaseApi();
const api = baseApi.api;

router.post("/deploy", async (req: Request, res: Response) => {
  const response = await api.post(`/deploy?uuid=${req.query.uuid}`);
  res.send({ data: response.data, status: 200 });
});
