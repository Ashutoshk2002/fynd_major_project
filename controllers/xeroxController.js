import xeroxModel from "../models/xeroxModel.js";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import braintree from "braintree";
//routes
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



//get page count
export const getCountController = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const pdfData = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfData); 
    const pageCount = pdfDoc.getPages().length; 
    fs.unlinkSync(pdfPath);
    res.status(200).send({
      success: true,
      message: "Count of PDF pages calculated successfully",
      pageCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

//payment
export const braintreePaymentXeroxController = async (req, res) => {
  try {
    const { nonce, description, address, location, file } = req.body;
    const fileName = req.file.filename;
    const filepath=req.file.path

    const fileBuffer =  fs.readFileSync(filepath);

    let copies = Number(req.body.copies);
    let page_count = Number(req.body.page_count);
    let temp_location = location;
    if (!temp_location) {
      temp_location = address;
    }
    let total = 0;
    total = page_count * 10;
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new xeroxModel({
            pdf: {
              data: fileBuffer,
              contentType: 'application/pdf',
            },
            description: description,
            location: temp_location,
            filename: fileName,
            copies: copies,
            page_count: page_count,
            payment: result,
            owner: req.user._id,
          }).save();
          fs.unlinkSync(filepath);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
