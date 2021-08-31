//IMPORT DE DOTENV
require('dotenv').config()

//IMPORT DES MODULES
const
    express = require('express'),
    app = express(),
    cors = require('cors'),
    methodOverride = require('method-override'),
    expressSession = require('express-session'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    mysql = require('mysql2'),
    cookieParser = require('cookie-parser'),
    util = require('util'),
    port = process.env.PORT;


// NETWORK INTERFACES
let ifaces = require('os').networkInterfaces();

//HELMET SÉCU
let helmet = require('helmet');



//UTILISATION C-PARSER ET HELMET
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');


//STORE MYSQL POUR EXPRESS SESSION
let MySQLStore = require('express-mysql-session')(expressSession);

//FORMATAGE DE DATE AVEC MOMENT
moment().format();

//CONFIG DB 
let options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

//ATTRIBUTION DU STORE SESSION MYSQL
let sessionStore = new MySQLStore(options);

//CONFIGURATION DU COOKIE DE SESSION
app.use(expressSession({
    key: 'ptiBiscuit',
    secret: 'lasecuavantout',
    store: sessionStore,
    resave: false,
    httpOnly: true,
    saveUninitialized: false
}));


//CONFIG MOMENT HANDLEBARS FORMAT DATE
let Handlebars = require('handlebars');
let MomentHandler = require('handlebars.moment');
MomentHandler.registerHelpers(Handlebars);
moment.locale('fr')


//IMPORT CSP HEADER MODULE CSP
const {
    expressCspHeader,
    INLINE,
    NONE,
    SELF
} = require('express-csp-header');

//CONFIG CSP HEADERS
app.use(expressCspHeader({
    directives: {
        'default-src': 'http://localhost:4000',
        'script-src': [SELF, INLINE,'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js'],
        'style-src': [SELF, INLINE,'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css'],
        'worker-src': [NONE],
        'img-src': ['data:', 'localhost:4000'],
        'block-all-mixed-content': true,
        'upgrade-insecure-requests': true
    }
}));

// INTERNET INTERFACES 2
let adresses = Object.keys(ifaces).reduce(function (result, dev) {
    return result.concat(ifaces[dev].reduce(function (result, details) {
        return result.concat(details.family === 'IPv4');
    }, []));
});

//METHOD OVERRIDE 
app.use(methodOverride('_method'))

//CONST HELPERS 
const {
    limitArray,
    upcase,
    lowercase
} = require('./api/helpers/hbs')


// CORS CONFIG
app.use(cors({
    origin: ['http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

//CONFIG MYSQL
db = mysql.createConnection(options);

//EN CAS D'ERREUR DE CO À LA DB
db.connect((err) => {
    if (err) console.error('erreur de connection a la db: ' + err.stack);
});

//CONFIG POUR ASYNCHRONE DES REQUÊTES SQL
const query = util.promisify(db.query).bind(db);

//EXPORT DANS UNE VARIABLE GLOBALE
global.query = query;


//EXPRESS STATIC CHEMIN DU DOSSIER PUBLIC ROUTE ASSETS
app.use('/assets', express.static('public'));

//BODY PARSER 
app.use(bodyParser.urlencoded({
    extended: true
}));

//GESTION D'ATTRIBUTS DE SESSION
app.use('*', (req, res, next) => {

    res.locals.user = req.session.user

    if (req.session.is_admin === true) res.locals.admin = req.session.is_admin

    next()

})


//CONFIG HANDLEBARS
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





//CONFIG ROUTER -> CONTROLLEURS
const ROUTER = require('./api/router');
app.use('/', ROUTER)


//EN CAS DE 404
app.get('*', function (req, res) {
    res.render('404')
});
//LISTEN DU PROJET EXECUTION DU SERVEUR, MESSAGE D'ACCUEIL
app.listen(port, () => {
    console.log("le serveur tourne bien sur le port:" + port);
});


// //
//     $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  
//     $$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ 
//     $$ |  $$ |$$ /  \__|$$ |  $$ |  $$ |   $$ /  \__|
//     $$$$$$$\ |$$ |$$$$\ $$ |  $$ |  $$ |   $$ |      
//     $$  __$$\ $$ |\_$$ |$$ |  $$ |  $$ |   $$ |      
//     $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$\ 
//     $$$$$$$  |\$$$$$$  |$$$$$$$  |  $$ |   \$$$$$$  |
//     \_______/  \______/ \_______/   \__|    \______/ 