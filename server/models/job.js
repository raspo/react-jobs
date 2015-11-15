/* eslint func-names:0 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const shortid = require('shortid');
const slug = require('slug');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const isUrl = function(string) {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    return string === '' || urlRegex.test(string);
};

const JobSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 64
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: isUrl,
            message: 'Please insert a valid url'
        }
    },
    description: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: 'Please insert a valid email'
        }
    },
    companyWebsite: {
        type: String,
        required: false,
        validate: {
            validator: isUrl,
            message: 'Please insert a valid url'
        }
    },
    companyTwitter: {
        type: String
    },
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
    return this._id + '-' + slug(this.title, {lower: true});
});

JobSchema.virtual('companyLogo').get(function() {
    if (!this.companyTwitter) { return ''; }
    return `https://twitter.com/${this.companyTwitter}/profile_image?size=bigger`;
});

JobSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Job', JobSchema);
