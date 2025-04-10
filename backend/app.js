import express from 'express';
import userRoutes from './routes/user.routes.js';
import electionRoutes from './routes/election.routes.js';
import candidacyRoutes from './routes/candidacy.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/candidacies', candidacyRoutes);
app.use('/api/elections', electionRoutes);

const PORT = process.env.PROYECT_PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
