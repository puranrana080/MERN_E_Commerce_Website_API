import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  try {
    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    res.json({
      message: "order created",
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
      success: true,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//verify, save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;
  try {
    let orderConfirm = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      payStatus: "paid",
    });

    res.json({ message: "Payment Successful", orderConfirm, success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//user specific order
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
  res.json(orders);
  console.log("Fetched orders from DB:", orders);
};

//user specific order
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 });
  res.json(orders);
  console.log("Fetched  allorders:", orders);
};
