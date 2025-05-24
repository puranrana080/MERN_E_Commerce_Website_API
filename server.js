import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//home testing
app.get("/", (req, res) => res.json({ message: "This is home route" }));

//user Router
app.use("/api/user", userRouter);

//product Router
app.use("/api/product", productRouter);

//cart Router
app.use("/api/cart", cartRouter);

//address Router
app.use("/api/address", addressRouter);

//payment Router
app.use("/api/payment/", paymentRouter);

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
