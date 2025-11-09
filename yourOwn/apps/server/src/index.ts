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
const CORS_ORIGIN =   'http://localhost:5000';


app.use(cors({origin: CORS_ORIGIN, credentials: true}));
app.use(express.json());

app.use('/dev', devRoutes);

// where routes will live
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('api/experiences', experienceRoutes);



app.get('/api/health', (_req, res) => {
    res.json({ok: true , service: 'server',} )
})


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})