import express from 'express';
import userRoutes from './routes/user.routes.js';
import electionRoutes from './routes/election.routes.js';
import candidacyRoutes from './routes/candidacy.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesPath = path.join(__dirname, 'files');
app.use('/files', express.static(filesPath));

app.use('/api/users', userRoutes);
app.use('/api/candidacies', candidacyRoutes);
app.use('/api/elections', electionRoutes);

const PORT = process.env.PROYECT_PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
