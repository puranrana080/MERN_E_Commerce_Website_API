import { Cart } from "../Models/Cart.js";

//add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  try {
    const userId = req.user;

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
  const userId = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      // return res.json({ message: "Cart Not found", success: false });
    }

    res.json({ message: "User Cart", cart });
  } catch (error) {
    res.json(error.message);
  }
};

//remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart not Found", success: false });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Product has been removed", success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//clear Cart
export const clearCart = async (req, res) => {
  const userId = req.user;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ items: [] });
    } else {
      cart.items = [];
    }
    await cart.save();
    res.json({ message: "Cart Cleared", success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//decrease quantity from cart
export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      if (item.qty > qty) {
        const pricePerUnit = item.price / item.qty;
        item.qty -= qty;
        item.price -= pricePerUnit * qty;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({ message: "Invalid Product Id", success: false });
    }
    await cart.save();
    res.json({ message: "Item qty decreased", cart, success: true });
  } catch (error) {
    res.json(error.message);
  }
};
