const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const exampleRoutes = require('./routes/exampleRoutes');
const tableDataRoutes = require("./routes/tableDataRoutes");

const TableDataCheckModel = require("./models/TableDataCheckModel");
const TableDataComplexModel = require("./models/TableDataComplexModel");
const TableDataColumnsModel = require("./models/TableDataColumnsModel");
const TableDataDevelopmentModel = require("./models/TableDataDevelopmentModel");

const initialDataCheck = require("./data/tableDataCheck.json"); 
const initialDataComplex = require("./data/tableDataComplex.json");
const initialDataColumns = require("./data/tableDataColumns.json");
const initialDataDevelopment = require("./data/tableDataDevelopment.json");


dotenv.config();


connectDB();


const app = express();


app.use(
    cors({
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        credentials: true, 
    })
);


app.use(express.json());


app.use('/api/examples', exampleRoutes);

app.use("/api", tableDataRoutes);

const initDataCheck = async () => {
  try {
    const count = await TableDataCheckModel.countDocuments();
    if (count === 0) {
      await TableDataCheckModel.insertMany(initialDataCheck);
      console.log("Data successfully added to the database.");
    } else {
      console.log("Data already exists.");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDataCheck();

const initDataComplex = async () => {
  try {
    const count = await TableDataComplexModel.countDocuments();
    if (count === 0) {
      await TableDataComplexModel.insertMany(initialDataComplex);
      console.log("Data successfully added to the database.");
    } else {
      console.log("Data already exists.");
    }  
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDataComplex();

const initDataColumns = async () => {
  try {
    const count = await TableDataColumnsModel.countDocuments();
    if (count === 0) {
      await TableDataColumnsModel.insertMany(initialDataColumns);
      console.log("Data successfully added to the database.");
    } else {
      console.log("Data already exists.");
    }  
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDataColumns();

const initDataDevelopment = async () => {
  try {
    const count = await TableDataDevelopmentModel.countDocuments();
    if (count === 0) {
      await TableDataDevelopmentModel.insertMany(initialDataDevelopment);
      console.log("Data successfully added to the database.");
    } else {
      console.log("Data already exists.");
    }  
  } catch (error) {
    console.error("Error initializing data:", error);
  }
} 

initDataDevelopment();


const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
