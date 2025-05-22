import { User } from "../Models/User.js";
import { Products } from "../Models/Product.js";

//add product

export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;
  try {
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.json({
      message: "Product added Successfully...",
      product,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get products
export const getProducts = async (req, res) => {
  let products = await Products.find().sort({ createdAt: -1 });
  res.json({ message: "All Products", products, success: true });
};

//find product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Products.findById(id);
    if (!product) return res.json({ message: "Invalid Id", success: false });
    res.json({ message: "Specified Product ", product, success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//update product by id
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.json({ message: "Invalid Id", success: false });
    res.json({ message: "Product has been updated ", product, success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//delete product by id
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Products.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid Id", success: false });

    res.json({ message: "Your Product has been deleted", succes: true });
  } catch (error) {
    res.json(error.message);
  }
};
