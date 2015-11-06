/* eslint func-names:0 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const shortid = require('shortid');
const slug = require('slug');

const JobSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    title: String,
    address: String,
    type: String,
    url: String,
    description: String,
    companyName: String,
    companyWebsite: String,
    companyTwitter: String,
    companyLogo: String,
    publishedAt: Date,
    expiringAt: Date
});

JobSchema.plugin(timestamps);

JobSchema.options.toObject = {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

JobSchema.virtual('slug').get(function() {
    return this._id + '-' + slug(this.title);
});

JobSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Job', JobSchema);
