import express from 'express';
const shopRouter =express.Router();
import {createEditShop} from '../controllers/shop.controllers.js'
import { isAuth } from '../middlewares/isAuth.js';
import multer from 'multer';
import {upload} from '../middlewares/multer.js';
shopRouter.post("/create-edit",isAuth ,upload.single("image"), createEditShop)

export default shopRouter