// Example.js
const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Example', exampleSchema);
