const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const dbConfig = require('./database/config');
const KnexSessionStore = require('connect-session-knex')(session);
const authRouter = require('./Auth/authRouter');
const userRouter = require('./users/usersRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session({
    name: 'token',
    resave: false,
    saveUninitialized: false,
    secret: 'authOne',
    cookie : {
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}));
server.use('/auth', authRouter);
server.use('/user', userRouter);

server.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to Auth 1'
    })
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Oops, something went wrong'
    })
});

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
});
