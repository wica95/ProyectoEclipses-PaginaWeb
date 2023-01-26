const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const logger = require("../util/logger");

mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false" , {useNewUrlParser:true})
mongoose.connect("mongodb+srv://DepAstro:SolarSystem2324@cluster0.koea89y.mongodb.net/test?authMechanism=DEFAULT" , {useNewUrlParser:true})
.then(() => {
    logger.info(`Conectado a la base de datos de MongoDB`);
    console.log("Conectado a la base de datos de MongoDB");
})
.catch(() => {
    logger.error(`No se pudo establcer conexión con la base de datos`);
    process.exit();
});