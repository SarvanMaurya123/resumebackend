import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import RagisterUser from './Routers/Ragister.router.js';
import Login from './Routers/Login.router.js';
import Logout from './Routers/Logout.router.js';
import Resume1 from './Routers/Resumeall/Resume1.router.js'
import Resume2 from './Routers/Resumeall/Resume2.router.js'
import totalUser from './Routers/DashbordRouter/TotalUser.router.js';
import ActiveUsers from './Routers/DashbordRouter/Active.router.js';

import userHistoryRouter from './Routers/Resumeall/userHistoryRouter.js'
import Forgotpage from './Routers/ForgetPassword.js'

const app = express();

app.use(cors({
    origin: process.env.CORS,
    methods: 'GET,POST,DELETE,PATCH,HEAD,PUT',
    credentials: true
}));

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Register routes
app.use('/api/v1/register', RagisterUser);
app.use('/api/v1/login', Login);
app.use('/api/v1/logout', Logout);
//resume 1 to all all start
app.use('/api/v1/resume1', Resume1);
app.use('/api/v1/resume2', Resume2);

//resume 1 to all all end
app.use('/api/v1', totalUser);
app.use('/api/v1', ActiveUsers);

app.use('/api/v1', userHistoryRouter);
app.use('/api/v1', Forgotpage);
export default app;
