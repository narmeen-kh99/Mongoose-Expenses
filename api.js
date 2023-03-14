const express = require("express");
const api = express.Router();
const moment = require("moment");
module.exports = api;
const Expenses = require("./model/Expense");
const bodyParser = require("body-parser");
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.get("/expenses", function (req, res) {
  date1 = req.query.d1;
  date2 = req.query.d2;
  if (date1 && date2) {
    Expenses.find({
      date: { $gt: new Date(date1), $lt: new Date(date2) },
    })
      .sort("-date")
      .then(function (expenses) {
        res.send(expenses);
      });
  } else if (date1 && date2 == undefined) {
    Expenses.find({
      date: { $gt: new Date(date1) },
    })
      .sort("-date")
      .then(function (expenses) {
        res.send(expenses);
      });
  } else {
    Expenses.find({})
      .sort("-date")
      .then(function (expenses) {
        res.send(expenses);
      });
  }
});

api.post("/expenses", function (req, res) {
  const newExpense = new Expenses({
    item: req.body.item,
    amount: req.body.amount,
    date: moment().format("LLLL"),
    group: req.body.group,
  });
  newExpense.save();
  console.log(`the amount of ${newExpense.item} is ${newExpense.amount}`);
  res.end();
});

api.put("/update", function (req, res) {
  Expenses.findOne({ group: req.query.group1 }).then(function (Expenses) {
    Expenses.group = req.query.group2;
    console.log(Expenses);
    Expenses.save();
    res.send(`the group of ${Expenses.item} changed to ${Expenses.group}`);
  });
});

api.get("/expenses/:group", function (req, res) {
  let totalAmountOfGroup = 0;
  Expenses.find({ group: req.params.group }).then(function (expenses) {
    if (req.query.total) {
      for (let expense of expenses) {
        totalAmountOfGroup += expense.amount;
      }
      res.send({ total: totalAmountOfGroup });
    } else {
      res.send(expenses);
    }
  });
});
