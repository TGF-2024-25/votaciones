const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware para procesar JSON
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
