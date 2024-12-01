import { Router } from 'express';
import verifyUserJWT from '../../Middlewere/Auth.middlewere.js';
import upload from '../../Middlewere/Multer.Middlerwere.js';
import { createProfile, getProfiles, getProfileById, deleteProfile, updateProfile } from '../../Controllar/Resumesall/Resume1.js';

const router = Router();

router.route('/')
    .post(verifyUserJWT, upload.single('profilePic'), createProfile)
    .get(verifyUserJWT, getProfiles);

router.route('/:id')
    .get(verifyUserJWT, getProfileById)
    .put(verifyUserJWT, upload.single('profilePic'), updateProfile)
    .delete(verifyUserJWT, deleteProfile);

export default router;
