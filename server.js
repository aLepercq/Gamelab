const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const gameRoutes = require('./routes/game.routes');
require("dotenv").config({path: "./config/.env"});
require("./config/db");
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    'allowedHeaders': ['sessionId', 'content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': ['GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE'],
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/game', gameRoutes);

//server
app.listen(PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});