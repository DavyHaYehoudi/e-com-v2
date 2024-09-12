import express, { Express, Request, Response } from "express";
import { environment } from "./environment.js";
import { checkConnection } from "./database/check-connection.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import { adminAccess } from "./middlewares/adminAccessMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import profileRoutes from "./routes/admin/customer/profile.routes.js";
import notesAdminRoutes from "./routes/admin/customer/notesAdmin.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import collectionAdminRoutes from "./routes/admin/collection/collection.routes.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());

checkConnection();

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);

// Customer routes
app.use("/api/customer", customerRoutes);

// Admin routes
app.use("/api/admin/customers", verifyToken, adminAccess, profileRoutes);
app.use("/api/admin/customers", verifyToken, adminAccess, notesAdminRoutes);
app.use(
  "/api/admin/collections",
  verifyToken,
  adminAccess,
  collectionAdminRoutes
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
