import Login from '../Controllar/Login.controler.js';
import { Router } from "express";
const router = Router()

router.route("/").post(Login)
export default router