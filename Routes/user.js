import express from "express";
import { login, profile, register, users } from "../Controllers/user.js";
import {authenticated} from "../Middlewares/auth.js"

const router = express.Router();

//register user
router.post("/register", register);

//login user
router.post('/login',login)

//get all users
router.get('/all',users)

//get user profile
router.get('/profile', authenticated,profile)

export default router;
