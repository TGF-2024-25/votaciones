import express from 'express';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
}));

// Rutas de usuarios
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
