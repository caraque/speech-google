const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const googleController = require("./controller/GoogleController");

/******** Configuración servidor ********/
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
/******** Fin Configuración ********/

const server = require('http').Server(app);

/** Servicios REST **/
app.post('/leerAudio', googleController.leerAudio);

/** Iniciar servidor **/
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Servidor corriendo en puerto ' + port);
});
/** ---------------- **/
