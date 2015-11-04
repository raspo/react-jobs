const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Something is happening on the API router.');
    next();
});

// GET /api
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

function getJobFixtures() {
    const jobs = [];
    var id;

    for (id = 0; id < 27; id++) {
        jobs.push({
            id: id + '',
            title: `Job Title #${id}`,
            companyName: 'That Company Inc.',
            companyWebsite: 'http://google.com',
            address: 'London, UK',
            companyLogo: '',
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
        job.description = '<h3>About you</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li><li>Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</li><li>Lorem voluptatibus nemo atque similique itaque deleniti harum quaerat.</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><h3>The job</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis possimus, assumenda quibusdam aperiam quo modi perspiciatis, voluptatibus nemo atque similique itaque deleniti harum quaerat, reprehenderit magni reiciendis ratione tempore suscipit.</p>';

        res.json({ job });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
