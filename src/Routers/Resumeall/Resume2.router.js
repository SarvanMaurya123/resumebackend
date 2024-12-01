import { Router } from 'express';
import verifyUserJWT from '../../Middlewere/Auth.middlewere.js';
import { resumeTwoCreate, getProfiles, deleteProfile, updateProfile } from '../../Controllar/Resumesall/Resume2.js';

const router = Router();

// Define POST route for creating a resume
router.route('/data')
    .post(verifyUserJWT, resumeTwoCreate)
    .get(verifyUserJWT, getProfiles)


router.route('/:id')
    .delete(verifyUserJWT, deleteProfile)
    .put(verifyUserJWT, updateProfile)
// Export the router
export default router;
