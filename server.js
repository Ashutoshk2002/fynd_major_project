import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import xeroxRoutes from "./routes/xeroxRoute.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';

const app = express();

//configure env
dotenv.config();

//database config
connectDB();

//esModule filename
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/dist")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/xerox", xeroxRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});
