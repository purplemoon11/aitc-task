import express, { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import v1Route from "./routes/index";
import setupSwagger from "./configs/swagger";

const app = express();

setupSwagger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

//Routes
app.use("/api/v1", v1Route);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// GLOBAL ERROR HANDLER
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.statusCode || 500).json({
    status: error?.status || "error",
    statusCode: error?.statusCode,
    message: error?.message || "Internal Server Error",
  });
});

// HANDLER UNCAUGHT EXCEPTION
process
  .on("unhandledRejection", (reason, promise) => {
    console.error(reason, "Unhandled Rejection at Promise", promise);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

export default app;
