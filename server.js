//import modules
const
    express = require('express'),
    app = express(),
    cors = require('cors'),
    // Gestion de la session
    methodOverride = require('method-override')
    expressSession = require('express-session'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mysql = require('mysql2'),
    port = process.env.PORT || 4000;


// Network interfaces
let ifaces = require('os').networkInterfaces();

// Iterate over interfaces ...
let adresses = Object.keys(ifaces).reduce(function (result, dev) {
    return result.concat(ifaces[dev].reduce(function (result, details) {
        return result.concat(details.family === 'IPv4');
    }, []));
});

app.use(methodOverride('_method'))

const {
    limitArray,
    upcase,
    lowercase
} = require('./api/helpers/hbs')


// Cors
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// 
db = mysql.createConnection({
    host: 'localhost',
    user: 'theo',
    password: 'toor',
    database: 'inf0_sec'
});

db.connect((err) => {
    if (err) console.error('erreur de connection a la db: ' + err.stack);
});

//Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        limitArray: limitArray,
        upcase,
        lowercase
    }
}));


// Express-session
app.use(expressSession({
    secret: 'securite',
    name: 'ptiBiscuit',
    saveUninitialized: true,
    resave: false
}));


//Express static pour le chemin de dossier
app.use('/assets', express.static('public'));

//BODY PARSER 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('*', (req, res, next) => {
    res.locals.user = req.session.user

    next()
})

// const {
//     request
// } = require('http');

//Router dirige chemins sur les controllers
const ROUTER = require('./api/router')
app.use('/', ROUTER)

//Run express notre projet
app.listen(port, () => {
    console.log("le serveur tourne bien sur le port:" + port);
});