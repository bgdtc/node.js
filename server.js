require('dotenv').config()
//import modules
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
    util = require('util'),
    port = process.env.PORT;


// Network interfaces
let ifaces = require('os').networkInterfaces();
let helmet = require('helmet');
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(helmet());
app.disable('x-powered-by');

let MySQLStore = require('express-mysql-session')(expressSession);

moment().format();

let options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

let sessionStore = new MySQLStore(options);

app.use(expressSession({
    key: 'ptiBiscuit',
    secret: 'lasecuavantout',
    store: sessionStore,
    resave: false,
    httpOnly: true,
    saveUninitialized: false
}));

//moment hbs

let Handlebars = require('handlebars');
let MomentHandler = require('handlebars.moment');
MomentHandler.registerHelpers(Handlebars);
moment.locale('fr')



const {
    expressCspHeader,
    INLINE,
    NONE,
    SELF
} = require('express-csp-header');

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
    origin: ['http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// 
db = mysql.createConnection(options);

db.connect((err) => {
    if (err) console.error('erreur de connection a la db: ' + err.stack);
});

const query = util.promisify(db.query).bind(db);
global.query = query;


//Express static pour le chemin de dossier
app.use('/assets', express.static('public'));

//BODY PARSER 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('*', (req, res, next) => {

    res.locals.user = req.session.user

    if (req.session.is_admin === true) res.locals.admin = req.session.is_admin

    next()

})


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





//Router dirige chemins sur les controllers
const ROUTER = require('./api/router');
app.use('/', ROUTER)



app.get('*', function (req, res) {
    res.render('404')
});
//Run express notre projet
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