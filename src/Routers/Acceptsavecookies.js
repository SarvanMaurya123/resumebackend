import express from 'express';
import acceptAllCookies from '../Controllar/AcceptAllCookies.js';  // Adjust the path as necessary
import saveCookieSettings from '../Controllar/SaveCookieSettings.js';
const router = express.Router();

// Route to accept all cookies
router.post('/accept-cookies', acceptAllCookies);

// Route to save detailed cookie settings
router.post('/save-cookie-settings', saveCookieSettings);

export default router;
