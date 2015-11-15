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
const compress = require('compression');
const favicon = require('serve-favicon');

try { fs.statSync(path.join(__dirname + '/ssl/server.key')); } catch (e) {
    // Here is a good guide on how to generate ssl certificates for development
    // http://www.akadia.com/services/ssh_test_certificate.html
    console.log('The server requires a SSL certificate');
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
app.use(compress());
app.use(redirectHTTP);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/reactjobs');

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const serverOptions = {
    key: fs.readFileSync(path.join(__dirname + '/ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname + '/ssl/server.crt')),
    requestCert: false,
    rejectUnauthorized: false
};

http.createServer(app).listen(3001); // 80 for prod
https.createServer(serverOptions, app).listen(3000, function() { // 443 for prod
    console.log('Secure server listening on port 3000');
});
