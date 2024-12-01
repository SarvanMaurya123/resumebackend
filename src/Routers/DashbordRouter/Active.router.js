import ActiveUser from "../../Controllar/Dashboard/Activeuser.js";
import { Router } from 'express';
import verifyUserJWT from '../../Middlewere/Auth.middlewere.js';
const router = Router();

router.route('/active-user').get(verifyUserJWT, ActiveUser);

export default router;