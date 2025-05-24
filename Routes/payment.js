import express from "express";
import {
  allOrders,
  checkout,
  userOrder,
  verify,
} from "../Controllers/payment.js";
import { authenticated } from "../Middlewares/auth.js";
const router = express.Router();

//initate payment(checkout)
router.post("/checkout", checkout);

//verify payment and save to db
router.post("/verify-payment", verify);

//user orders
router.get("/userorder", authenticated, userOrder);

//all orders
router.get("/orders", allOrders);

export default router;
