import express from "express";
import { submitReview, getShopReviews } from "../controllers/review.controller.js";
import { isAuth } from '../middlewares/isAuth.js';
 // your existing middleware

const router = express.Router();

router.post("/submit", isAuth, submitReview);
router.get("/:shopId", isAuth, getShopReviews);

export default router;