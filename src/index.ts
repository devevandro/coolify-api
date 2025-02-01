import express from "express";
import { router } from './routes/healthCheckRoute';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
