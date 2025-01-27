const mongoose = require("mongoose");

const tableDataDevelopmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tech: {
    type: [String],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
});

const TableDataDevelopmentModel = mongoose.model("TableDataDevelopmentModel", tableDataDevelopmentSchema);

module.exports = TableDataDevelopmentModel;
