import express, { Express, Request, Response } from "express";
import { environment } from "./types/environment.js";
import { checkConnection } from "./database/check-connection.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import { adminAccess } from "./middlewares/adminAccessMiddleware.js";
import profileRoutes from "./routes/admin/customer/profile.routes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());

checkConnection();

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);

// Admin routes
app.use("/api/admin/customers", verifyToken, adminAccess, profileRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
