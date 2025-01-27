const express = require("express");
const router = express.Router();
const TableDataCheck = require("../models/TableDataCheckModel");
const TableDataComplex = require('../models/TableDataComplexModel')
const TableDataColumns = require('../models/TableDataColumnsModel')
const tableDataDevelopment = require('../models/TableDataDevelopmentModel')

router.get("/table-data-check", async (req, res) => {
  try {
    const data = await TableDataCheck.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting data.", error });
  }
});

router.get("/table-data-complex", async (req, res) => {
  try {
    const data = await TableDataComplex.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting data.", error });
  }
});

router.get("/table-data-columns", async (req, res) => {
  try {
    const data = await TableDataColumns.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting data.", error });
  }
});

router.get("/table-data-development", async (req, res) => {
  try {
    const data = await tableDataDevelopment.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting data.", error });
  }
});

module.exports = router;
