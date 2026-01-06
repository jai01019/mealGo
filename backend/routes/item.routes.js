import express from 'express';
const itemRouter =express.Router();
import {createItem, editItem} from '../controllers/item.controllers.js'
import { isAuth } from '../middlewares/isAuth.js';
import multer from 'multer';
import { upload } from '../middlewares/multer.js';

itemRouter.post("/create",isAuth , upload.single("image"), createItem)
itemRouter.put("/edit/:itemId",isAuth , upload.single("image"), editItem)
export default itemRouter