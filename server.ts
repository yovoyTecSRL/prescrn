require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
   next();
});

app.post('/chat', async (req, res) => {
    let { nombre, cedula, telefono, direccion, paso, validando } = req.body;
    paso = paso || 1;

    // Paso 1: Preguntar nombre
    if (paso === 1) {
        if (!nombre) return res.json({ paso: 1, pregunta: "¿Cuál es tu nombre completo?" });
        return res.json({ paso: 2, pregunta: "¿Cuál es tu cédula?" });
    }

    // Paso 2: Preguntar cédula
    if (paso === 2) {
        if (!cedula) return res.json({ paso: 2, pregunta: "¿Cuál es tu cédula?" });
        return res.json({ paso: 3, pregunta: "¿Cuál es tu teléfono?" });
    }

    // Paso 3: Preguntar teléfono
    if (paso === 3) {
        if (!telefono) return res.json({ paso: 3, pregunta: "¿Cuál es tu teléfono?" });
        return res.json({ paso: 4, pregunta: "¿Cuál es la dirección de entrega de la tarjeta?" });
    }

    // Paso 4: Preguntar dirección
    if (paso === 4) {
        if (!direccion) return res.json({ paso: 4, pregunta: "¿Cuál es la dirección de entrega de la tarjeta?" });

        // Inicia validación
        return res.json({
            validando: true,
            mensaje: "Validando en CCSS...",
            siguiente: "PROTECTORA"
        });
    }

    // Validaciones simuladas
    if (validando === "PROTECTORA") {
        return res.json({
            validando: "PROTECTORA",
            mensaje: "Validando en Protectora de Crédito...",
            siguiente: "BCR"
        });
    }

    if (validando === "BCR") {
        return res.json({
            validando: "BCR",
            mensaje: "Validando en Banco de Costa Rica...",
            siguiente: "HACIENDA"
        });
    }

    if (validando === "HACIENDA") {
        return res.json({
            validando: "HACIENDA",
            mensaje: "Validando en Ministerio de Hacienda...",
            siguiente: "FINAL"
        });
    }

    if (validando === "FINAL") {
        const numeroSolicitud = Math.floor(100000 + Math.random() * 900000);
        return res.json({
            orden_creada: true,
            mensaje: `¡Felicidades! Clasificaste para una tarjeta de crédito de $10,000. La orden de entrega fue creada y te llegará en las próximas 48 horas a: "${direccion}". Tu número de solicitud es: ${numeroSolicitud}.`,
            numeroSolicitud
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});