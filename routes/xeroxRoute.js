import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentXeroxController,
  getCountController,
} from "../controllers/xeroxController.js";
import multer from "multer";
import { braintreeTokenController } from "../controllers/productController.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//routes

//page count
router.post(
  "/get-count",
  upload.single("file"),
  requireSignIn,
  getCountController
);

// payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post(
  "/braintree/payment",
  upload.single("file"),
  requireSignIn,
  braintreePaymentXeroxController
);

export default router;
