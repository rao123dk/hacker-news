const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = 7777
// Route requires
const user = require('./routes/user');
const post = require('./routes/post');


// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:3000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Sessions
app.use(
	session({
		secret: 'testttfsfses',
		store: new MongoStore({ mongooseConnection: dbConnection, autoRemove: 'interval',autoRemoveInterval: 200 }),
		resave: false,
		saveUninitialized: false
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/user', user)
app.use('/post', post)

//app.use('/', (req,res)=> res.send(200))


// Starting Server
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})