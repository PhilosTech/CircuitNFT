const mongoose = require('mongoose');

const tableDataColumnsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: String, // Можно использовать Date, если хотите работать с датой как с объектом
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
});

const tableDataColumnsModel = mongoose.model("tableDataColumnsModel", tableDataColumnsSchema);

module.exports = tableDataColumnsModel;
