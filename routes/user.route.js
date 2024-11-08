import express from 'express';
import { changePassword, loginUser, reigisterUser } from '../controller/user.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';


const router = express.Router();


router.post('/register',reigisterUser)
router.post('/login',loginUser);
router.post('/change-password',verifyUser,changePassword);





export default router