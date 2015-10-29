const _ = require('lodash');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.development');
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use(express.static(__dirname + '/public'));

// mongoose.connect('mongodb://localhost/reactjobs');


const router = express.Router();

router.use((req, res, next) => {
    console.log('Something is happening.');
    next();
});

// GET /api
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});



function getJobFixtures() {
    const jobs = [];

    for (var id = 0; id < 10; id++) {
        jobs.push({
            id: id + '',
            title: `Job Title #${id}`,
            company: 'That Company Inc.',
            address: 'London, UK',
            logo: '',
            created: Date.now() - (id * 10 * 24 * 60 * 60 * 1000)
        });
    }

    return jobs;
}


// GET /api/jobs
router.get('/jobs', (req, res) => {
    const jobs = getJobFixtures();
    res.json({ jobs });
});

// GET /api/jobs/:job_id
router.get('/jobs/:job_id', (req, res) => {
    const jobs = getJobFixtures();
    const job = _.find(jobs, 'id', req.params.job_id);

    if (job) {

        job.type = 'full-time';
        job.content = '<h3>About you</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li><li>Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</li><li>Lorem voluptatibus nemo atque similique itaque deleniti harum quaerat.</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><h3>The job</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p>';

        res.json({ job });
    } else {
        res.sendStatus(404);
    }
});

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);
console.log('App listening on port 3000');
