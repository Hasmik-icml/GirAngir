import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routers";
import { errorHandler } from "./middleware/error-handler.middleware";

const app = express(); 
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/', router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})