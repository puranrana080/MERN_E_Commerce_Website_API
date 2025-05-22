import { Cart } from "../Models/Cart.js";

//add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  try {
    const userId = "682eb8c58616f8bd972486d0";

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += Number(qty);
      cart.items[itemIndex].price += Number(price * qty);
    } else {
      cart.items.push({ productId, title, price, qty, imgSrc });
    }

    await cart.save();
    res.json({ message: "Items Added to cart", cart });
  } catch (error) {
    res.json(error.message);
  }
};

//get user cart
export const userCart = async (req, res) => {
  const userId = "682eb8c58616f8bd972486d0";
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart Not found", success: false });
    res.json({ message: "User Cart", cart });
  } catch (error) {
    res.json(error.message);
  }
};
