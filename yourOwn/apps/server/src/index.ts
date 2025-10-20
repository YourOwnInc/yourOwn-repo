import 'dotenv/config';
import express from "express"
import cors from "cors";
import { z} from 'zod';
// Where we will import routes for our apps
import userRoutes from "./routes/user.routes";

//import ... from "./routes/..."


const app = express();
// HARD for now 
const PORT =  5000;
const CORS_ORIGIN =   'http://localhost:5000';


app.use(cors({origin: CORS_ORIGIN, credentials: true}));
app.use(express.json());

// where routes will live
app.use('/api/users', userRoutes);
app.get('/api/health', (_req, res) => {
    res.json({ok: true , service: 'server',} )
})


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})