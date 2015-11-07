const express = require('express');
const router = express.Router();

const JobModel = require('../models/job.js');

router.use((req, res, next) => {
    // TODO add logging
    // TODO check for expiration dates
    next();
});

// GET /api
router.get('/', (req, res) => {
    res.json({ message: 'API v1.0' });
});

// GET /api/jobs
router.get('/jobs', (req, res) => {
    JobModel.find({
        publishedAt: { $ne: null }
    }, (err, jobs) => {
        if (err) { res.send(err); }

        const transformedJobs = jobs.map((job) => {
            return job.toObject({transform: true, virtuals: true});
        });

        res.json({ jobs: transformedJobs });
    });
});

// POST /api/jobs
router.post('/jobs', (req, res) => {
    const job = new JobModel(req.body);

    job.save((err) => {
        if (err) { res.send(err); }

        res.json({
            job: job.toObject({
                transform: true,
                virtuals: true
            })
        });
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

// POST /api/jobs/:job_id/publish
router.post('/jobs/:job_id/publish', (req, res) => {
    JobModel.findOne({_id: req.params.job_id}, (err, job) => {
        if (err) { res.send(err); }

        if (job) {
            const now = Date.now();
            const expirationDate = now + (30 * 24 * 60 * 60 * 1000);

            job.publishedAt = new Date(now);
            job.expiringAt = new Date(expirationDate);
            job.save((error) => {
                if (error) { res.send(error); }

                res.json({
                    job: job.toObject({
                        transform: true,
                        virtuals: true
                    })
                });
            });
        } else {
            res.sendStatus(404);
        }
    });
});


module.exports = router;