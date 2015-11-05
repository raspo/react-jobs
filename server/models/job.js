const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const timestamps = require('mongoose-timestamp');

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
    companyLogo: String
});

JobSchema.plugin(timestamps);

JobSchema.options.toObject = {
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

JobSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Job', JobSchema);
