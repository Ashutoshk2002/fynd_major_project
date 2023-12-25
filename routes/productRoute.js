import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProduct,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import productModel from "../models/productModel.js";

const router = express.Router();
//routes

//create products
router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  isAdmin,
  createProductController
);

//get products
router.get("/get-product", getProductController);

//single products
router.get("/get-product/:slug", getSingleProduct);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update products
router.put(
  "/update-product/:id",
  requireSignIn,
  formidable(),
  isAdmin,
  updateProductController
);

// filter product
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// similar product
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController);

// payment routes
//token
router.get("/braintree/token",braintreeTokenController );

//payments
router.post("/braintree/payment",requireSignIn,braintreePaymentController );

export default router;
