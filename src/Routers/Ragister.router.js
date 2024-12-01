import { RagisterUser } from '../Controllar/Ragistation.controler.js';
import { Router } from "express";
const router = Router()

router.route("/").post(RagisterUser)
export default router