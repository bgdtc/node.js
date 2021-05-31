//import modules

const
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 4000;


// Network interfaces
let ifaces = require('os').networkInterfaces();

// Iterate over interfaces ...
let adresses = Object.keys(ifaces).reduce(function (result, dev) {
    return result.concat(ifaces[dev].reduce(function (result, details) {
        return result.concat(details.family === 'IPv4');
    }, []));
});


//Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

//Express static pour le chemin de dossier
app.use('/assets', express.static('public'));

//BODY PARSER 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const {
    request
} = require('http');
//Router dirige chemins sur les controllers

const ROUTER = require('./api/router')
app.use('/', ROUTER)




//Run express notre projet

app.listen(port, () => {
    console.log("le serveur tourne bien sur le port:" + port);
});