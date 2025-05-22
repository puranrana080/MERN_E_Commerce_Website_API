import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { authenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add address
router.post("/add",authenticated, addAddress);

//get address
router.get('/get',authenticated,getAddress)

export default router;
