import 'dotenv/config';
import express from "express"
import cors from "cors";
import { z} from 'zod';


const app = express();
// HARD for now 
const PORT =  5000;
const CORS_ORIGIN =   'http://localhost:5000';

// where routes will love 
// const userRoutes = require("./routes/user.routes");
// app.use("api/users", userRoutes);

app.use(cors({origin: CORS_ORIGIN, credentials: true}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({ok: true , service: 'server',} )
})

// Example: input validation with zod
app.post('/api/users', (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1)
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() })
  }

  // TODO: persist user
  res.status(201).json({ user: parse.data })
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