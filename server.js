const express = require("express");
const path = require("path");
const api = require("./api");
const bodyParser = require("body-parser");
const expensesData = require("./expenses.json");
const Expenses = require("./model/Expense");
const app = express();
const port = 3111;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "noda_modules")));
app.use("/", api);

app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
/*for (expense of expensesData) {
  const newExpense = new Expenses({
    item: expense.item,
    amount: expense.amount,
    date: expense.date,
    group: expense.group,
  });
  newExpense.save();
  console.log(newExpense);
}*/
