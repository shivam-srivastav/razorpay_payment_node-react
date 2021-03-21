require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Razorpay = require("razorpay");
// app.use(bodyParser,{urlendcode:false});
app.use(bodyParser({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to Payment Gateway",
  });
});

app.post("/orders", (req, res) => {
  const instants = new Razorpay({
    key_id: "rzp_test_Zz3DlmFvCiNuPY",
    key_secret: "erLlJjvXbxy1H0MQTtp3j2OI",
  });
  console.log(req.body);
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  if (!req.body) {
    res.status(400).json({
      msg: "Request is Empty",
    });
  }
  instants.orders.create(options, async (err, orderData) => {
    if (err) {
      res.status(5000).json({
        err: err,
      });
    }
    res.status(200).json({
      message: "Created Order Successfully",
      orders: orderData,
    });
  });
});
app.post("/capture/:payment_id", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      msg: "Request is empty",
    });
  }
  const amount = req.body.amount;
  const { payment_id } = req.params;
  console.log(amount, payment_id);
  res.status(200).json({
    message: "success",
    transactionId: payment_id,
  });
});
app.listen(process.env.PORT || 4001, () => {
  console.log(`Server is working on ${process.env.PORT || 4001}`);
});
