import express from 'express';
import userRoutes from './routes/user.routes.js';
import candidacyRoutes from './routes/candidacy.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/candidacies', candidacyRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
