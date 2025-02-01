import express from "express";
import { router as healthCheckRoute } from "./routes/healthCheck";
import { router as applicationsRoute } from "./routes/applications";
import { router as servicesRoute } from "./routes/services";
import { router as operationsRoute } from "./routes/operations";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use("/api", [
  healthCheckRoute,
  applicationsRoute,
  servicesRoute,
  operationsRoute,
]);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
