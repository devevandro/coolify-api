import { Router, Request, Response } from "express";

export const router = Router();

router.get("/health-check", (req: Request, res: Response) => {
  res.json({ message: "API is up and running" });
});
