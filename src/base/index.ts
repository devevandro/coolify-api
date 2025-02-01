import axios, { AxiosInstance } from "axios";
import { ENVIRONMENTS } from "../constants";

export class CoolifyBaseApi {
  public api: AxiosInstance;

  constructor() {
    const { COOLIFY_API_URL, COOLIFY_API_TOKEN } = ENVIRONMENTS;
    this.api = axios.create({
      baseURL: COOLIFY_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COOLIFY_API_TOKEN}`,
      },
    });
  }
}
