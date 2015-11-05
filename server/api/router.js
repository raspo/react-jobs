const express = require('express');
const router = express.Router();

const JobModel = require('../models/job.js');

router.use((req, res, next) => {
    // TODO add logging
    next();
});

// GET /api
router.get('/', (req, res) => {
    res.json({ message: 'API v1.0' });
});

// GET /api/jobs
router.get('/jobs', (req, res) => {
    JobModel.find((err, jobs) => {
        if (err) { res.send(err); }

        const transformedJobs = jobs.map((job) => {
            return job.toObject({transform: true, virtuals: true});
        });

        res.json({ jobs: transformedJobs });
    });
});

// GET /api/jobs/:job_id
router.get('/jobs/:job_id', (req, res) => {
    JobModel.findOne({_id: req.params.job_id}, (err, job) => {
        if (err) { res.send(err); }

        if (job) {
            res.json({
                job: job.toObject({
                    transform: true,
                    virtuals: true
                })
            });
        } else {
            res.sendStatus(404);
        }
    });
});

// POST /api/jobs
router.post('/jobs', (req, res) => {
    const job = new JobModel(req.body);

    job.save((err) => {
        if (err) { res.send(err); }

        res.json(job.toJSON());
    });
});


module.exports = router;
