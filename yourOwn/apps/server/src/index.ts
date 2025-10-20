import 'dotenv/config';
import express from "express"
import cors from "cors";
import { z} from 'zod';
import userRoutes from "./routes/user.routes";
// Where we will import routes for our app

// const ... = require("./routes/....");



const app = express();
// HARD for now 
const PORT =  5000;
const CORS_ORIGIN =   'http://localhost:5000';

// where routes will love 
// const userRoutes = require("./routes/user.routes");
// app.use("api/users", userRoutes);

app.use(cors({origin: CORS_ORIGIN, credentials: true}));
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ok: true , service: 'server',} )
})

// Not found
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Centralized error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})