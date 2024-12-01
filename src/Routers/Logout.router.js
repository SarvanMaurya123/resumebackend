import LogoutUser from '../Controllar/Logout.controller.js';
import verifyUserJWT from '../Middlewere/Auth.middlewere.js'
import { Router } from "express";
const router = Router()

router.route("/").post(verifyUserJWT, LogoutUser)
export default router