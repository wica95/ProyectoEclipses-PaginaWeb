const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const logger = require("./util/logger");
const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Escuchando al puerto: ${port}`);
    logger.info(`API iniciada en el puerto ${port}`);
});

// MongoDB connection
require('./models/connection');

// Map paths
const mapPaths_routes = require('./routes/MapPathsRoutes');
app.use('/api', mapPaths_routes);