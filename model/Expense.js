// do the data
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/ExpensesDB", {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

const expensesSchema = new Schema({
  item: String,
  amount: Number,
  date: Date,
  group: String,
});
const Expenses = mongoose.model("expenses", expensesSchema);
module.exports = Expenses;
