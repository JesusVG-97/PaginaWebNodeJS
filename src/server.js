var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config');
var bodyParse = require("body-parser");

const email = require("./servidor/email");

var app = express();
app.set('port', (process.env.PORT || 4000));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use ('/static', express.static('dist'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const oEmail = new email({
    "host":"smtpout.securserver.net",
    "port":"3535",
    "secure":false,
    "auth":{
        "type":"login",
        "user":"jesusvg97cs@gmail.com",
        "pass":"jesus"
    }
}); 

app.get('/', function(req,res,next){
    res.send('Jesus');
});

app.post('/api/contacto',function(req,res,next){
    let email={
        from:"ejemplo@ejemplo.com",
        to:"jesusvg97cs@gmail.com",
        subject:"Nuevo mensaje de usuario",
        html:`
            <div>
            <p>Correo:${req.body.c}</p>
            <p>Nombre: ${req.body.n}</p>
            <p>Mensaje:${req.body.m}</p>
            </div>
        `
    }
    oEmail.enviarCorreo(email);
    res.send("ok");
});

app.listen(app.get('port'),()=> {
    console.log('servidor activo')
});
