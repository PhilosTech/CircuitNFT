// exampleController.js
const Example = require('../models/Example');

const getExamples = async (req, res) => {
    const examples = await Example.find();
    res.json(examples);
};

module.exports = { getExamples };
