const mongoose = require ('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type : String,
        //required: 'This field is required',
    }
});

const Newsletter = mongoose.model ('newsletter', newsletterSchema);

module.exports = Newsletter;

