import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  removeProductFromCart,
  userCart,
} from "../Controllers/cart.js";
const router = express.Router();

//add to cart
router.post("/add", addToCart);

//get user cart
router.get("/user", userCart);

//remove product from cart
router.delete("/remove/:productId", removeProductFromCart);

//clear cart
router.delete('/clear',clearCart)

//decrease item qty
router.post('/--qty',decreaseProductQty)

export default router;
