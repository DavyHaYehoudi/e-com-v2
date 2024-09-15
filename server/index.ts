import express, { Express, Request, Response } from "express";
import { environment } from "./environment.js";
import { checkConnection } from "./database/check-connection.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import { adminAccess } from "./middlewares/adminAccessMiddleware.js";
// Public routes
import authRoutes from "./routes/freeAccess/auth.routes.js";
import collectionRoutes from "./routes/freeAccess/collection.routes.js";
import categoryRoutes from "./routes/freeAccess/category.routes.js";
import tagRoutes from "./routes/freeAccess/tag.routes.js";
import discountRoutes from "./routes/freeAccess/discount.routes.js";
import codePromoRoutes from "./routes/freeAccess/codePromo.routes.js";
import productRoutes from "./routes/freeAccess/product.routes.js";
import deliveryRoutes from "./routes/freeAccess/delivery.routes.js";
// Customer routes
import customerRoutes from "./routes/customer/customer.routes.js";
// Admin routes
import profileRoutes from "./routes/admin/customer/profile.routes.js";
import notesAdminRoutes from "./routes/admin/customer/notesAdmin.routes.js";
import collectionAdminRoutes from "./routes/admin/collection/collection.routes.js";
import categoryAdminRoutes from "./routes/admin/category/category.routes.js";
import tagAdminRoutes from "./routes/admin/tag/tag.routes.js";
import discountAdminRoutes from "./routes/admin/discount/discount.routes.js";
import codePromoAdminRoutes from "./routes/admin/code-promo/codePromo.routes.js";
import productAdminRoutes from "./routes/admin/product/product.routes.js";
import deliveryAdminRoutes from "./routes/admin/delivery/delivery.routes.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());

checkConnection();

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/code-promos", codePromoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deliveries", deliveryRoutes);

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
app.use("/api/admin/categories", verifyToken, adminAccess, categoryAdminRoutes);
app.use("/api/admin/tags", verifyToken, adminAccess, tagAdminRoutes);
app.use("/api/admin/discounts", verifyToken, adminAccess, discountAdminRoutes);
app.use(
  "/api/admin/code-promos",
  verifyToken,
  adminAccess,
  codePromoAdminRoutes
);
app.use("/api/admin/products", verifyToken, adminAccess, productAdminRoutes);
app.use("/api/admin/deliveries", verifyToken, adminAccess, deliveryAdminRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
