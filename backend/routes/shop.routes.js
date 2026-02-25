import express from 'express';
const shopRouter =express.Router();
import {createEditShop,getMyShop,getAllItemsOfShop,getShopsByCity} from '../controllers/shop.controllers.js'
import { isAuth } from '../middlewares/isAuth.js';
import multer from 'multer';
import {upload} from '../middlewares/multer.js';
shopRouter.post("/create-edit",isAuth ,upload.single("image"), createEditShop)
shopRouter.get("/getShop",isAuth,getMyShop)
shopRouter.get("/items/:shopId",isAuth,getAllItemsOfShop)
shopRouter.get("/getShopsByCity/:city",isAuth,getShopsByCity)
export default shopRouter