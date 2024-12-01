import totalUser from "../../Controllar/Dashboard/TotalUser.js";
import { Router } from 'express';
import verifyUserJWT from '../../Middlewere/Auth.middlewere.js';
const router = Router();

router.route('/total-user').get(verifyUserJWT, totalUser);

export default router;