require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Definir rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/communities', require('./routes/communities'));
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));