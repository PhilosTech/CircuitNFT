const mongoose = require("mongoose");

const tableDataComplexSchema = new mongoose.Schema({
  name: {
    type: String,
    required: Boolean,
  },
  status: {
    type: String,
    required: Boolean,
  },
  date: {
    type: String,
    required: Boolean,
  },
  progress: {
    type: Number,
    required: Boolean,
  },
});

const TableDataComplexModel = mongoose.model("TableDataComplexModel", tableDataComplexSchema);

module.exports = TableDataComplexModel;
