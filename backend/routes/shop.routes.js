import express from 'express';
const shopRouter =express.Router();
<<<<<<< HEAD
import {createEditShop,getMyShop,getAllItemsOfShop} from '../controllers/shop.controllers.js'
=======
import {createEditShop,getMyShop,getAllItemsOfShop,getShopsByCity} from '../controllers/shop.controllers.js'
>>>>>>> fa2b8ee35104f487c6bd627475420531a9a261cf
import { isAuth } from '../middlewares/isAuth.js';
import multer from 'multer';
import {upload} from '../middlewares/multer.js';
shopRouter.post("/create-edit",isAuth ,upload.single("image"), createEditShop)
shopRouter.get("/getShop",isAuth,getMyShop)
shopRouter.get("/items/:shopId",isAuth,getAllItemsOfShop)
<<<<<<< HEAD

=======
shopRouter.get("/getShopsByCity/:city",isAuth,getShopsByCity)
>>>>>>> fa2b8ee35104f487c6bd627475420531a9a261cf
export default shopRouter