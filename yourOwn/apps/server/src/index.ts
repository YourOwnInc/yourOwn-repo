import 'dotenv/config';
import express from "express"
import cors from "cors";
import { z} from 'zod';
// Where we will import routes for our apps
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes"
import experienceRoutes from "./routes/experience-entry.routes"

import devRoutes from './routes/dev'

//import ... from "./routes/..."


const app = express();
// HARD for now 
const PORT =  5000;
const CORS_ORIGIN =   'http://localhost:5173';
const corsOptions = {
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Session-Id", "X-Requested-With"],
  exposedHeaders: ["Location"],
  credentials: false, // Set to true if you are handling cookies/sessions that need to be sent cross-origin
};


// 2. Apply the CORS middleware with your options
// This should be done early in your middleware stack, BEFORE your routes.
app.use(cors(corsOptions));
app.use(express.json());


app.use('/dev', devRoutes);

// where routes will live
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api', experienceRoutes);



app.get('/api/health', (_req, res) => {
    res.json({ok: true , service: 'server',} )
})


// JSON error handler so Zod never returns HTML
app.use((err: any, _req: any, res: any, _next: any) => {
  if (err?.name === "ZodError" || err?.issues) {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Invalid request", details: err.issues }
    });
  }
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "Unexpected error" }});
});


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})

export default app;