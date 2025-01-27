const mongoose = require("mongoose");

const tableDataCheckSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: Boolean,
  },
  quantity: {
    type: Number,
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

const TableDataCheckModel = mongoose.model("TableDataCheckModel", tableDataCheckSchema);

module.exports = TableDataCheckModel;
