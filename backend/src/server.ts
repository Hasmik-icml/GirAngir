import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routers";
import { errorHandler } from "./middleware/error-handler.middleware";

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.API_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).json({
        error: "Route not found",
        message: "The route you are trying to access does not exist",
    });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})