// Basic Lib Imports
const express = require("express");
const dotenv = require("dotenv").config();

// Middlewares
const {
  errorHandler,
} = require("./src/application/middleware/errorMiddleware");

// Database connection with mongoose
const connectDB = require("./src/infrastructure/db/database");
connectDB();

// Routers
const userRouter = require("./src/application/routers/userRoutes");

const attendanceRouter = require('./src/application/routers/attendanceRoutes')

// Express app initialization
const port = process.env.PORT || 3000;
const app = express();

// Required for parsing request bodies
app.use(express.json());

// Error handler middleware
app.use(errorHandler);

// Application routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/attendance/", attendanceRouter);

app.listen(port, () =>
  console.log(`Server started on port http://127.0.0.1:${port}`)
);