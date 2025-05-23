import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js"
import dotenv from "dotenv";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

//home testing
app.get("/", (req, res) => res.json({ message: "This is home route" }));

//user Router
app.use("/api/user", userRouter);

//product Router
app.use("/api/product", productRouter);

//cart Router
app.use("/api/cart", cartRouter);

//address Router
app.use('/api/address',addressRouter)

mongoose
  .connect(process.env.MONGODB_URL, { dbName: "E_Commerce_Website" })
  .then(() => {
    console.log("MongoDb connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening to PORT ${process.env.PORT}`);
});
