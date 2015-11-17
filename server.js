/* eslint func-names:0 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const filter = require('content-filter');
const compress = require('compression');
const favicon = require('serve-favicon');

const config = require('./config');

try { fs.statSync(path.join(__dirname, config.ssl.key)); } catch (e) {
    // Here is a good guide on how to generate ssl certificates for development
    // http://www.akadia.com/services/ssh_test_certificate.html
    console.error('The server requires a SSL certificate');
    process.exit(0);
}

const apiRouter = require('./server/api/router');
const redirectHTTP = function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(filter());
app.use(compress());
app.use(redirectHTTP);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

mongoose.connect(config.db.uri, {
    user: config.db.username,
    pass: config.db.password
}, function(err) {
    if (err) {
        console.error('There was an error trying to connect to the DB');
        process.exit(0);
    }
});

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const serverOptions = {
    key: fs.readFileSync(path.join(__dirname, config.ssl.key)),
    cert: fs.readFileSync(path.join(__dirname, config.ssl.cert)),
    requestCert: false,
    rejectUnauthorized: false
};

http.createServer(app).listen(config.http.port);
https.createServer(serverOptions, app).listen(config.https.port, function() {
    console.log(`Secure server listening on port ${config.https.port}`);
});
