import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  removeProductFromCart,
  userCart,
} from "../Controllers/cart.js";

import { authenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add to cart
router.post("/add", authenticated, addToCart);

//get user cart
router.get("/user", authenticated, userCart);

//remove product from cart
router.delete("/remove/:productId", authenticated, removeProductFromCart);

//clear cart
router.delete("/clear", authenticated, clearCart);

//decrease item qty
router.post("/--qty", authenticated, decreaseProductQty);

export default router;
