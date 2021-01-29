const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoute = require('./routes/posts');
const app = express();
mongoose.connect('mongodb+srv://andrew_nagulyak:UxJoJiJDGu7ClKG2@cluster0.03sc7.mongodb.net/NHTea?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('conneced to db');
}).catch(() => {
    console.log('connection failed');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
// QuBqs0T45GDKPlIG
app.use("/api/posts", postsRoute);

module.exports = app;
