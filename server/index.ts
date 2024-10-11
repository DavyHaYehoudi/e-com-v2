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
import reviewRoutes from "./routes/freeAccess/review.routes.js";
import giftCardRoutes from "./routes/freeAccess/giftcard.routes.js";

// Reserved routes
import customerPrivateRoutes from "./routes/reserved/customer.routes.js";
import reviewReservedRoutes from "./routes/reserved/review.routes.js";
import giftCardReservedRoutes from "./routes/reserved/giftCard.routes.js";
import paymentReservedRoutes from "./routes/reserved/payment.routes.js";
import orderReservedRoutes from "./routes/reserved/order.routes.js";

// Admin routes
import profileRoutes from "./routes/admin/customer/profile.routes.js";
import notesAdminRoutes from "./routes/admin/customer/notesAdmin.routes.js";
import cashBackAdminRoutes from "./routes/admin/cash-back/cashBack.routes.js";
import collectionAdminRoutes from "./routes/admin/collection/collection.routes.js";
import categoryAdminRoutes from "./routes/admin/category/category.routes.js";
import tagAdminRoutes from "./routes/admin/tag/tag.routes.js";
import discountAdminRoutes from "./routes/admin/discount/discount.routes.js";
import codePromoAdminRoutes from "./routes/admin/code-promo/codePromo.routes.js";
import productAdminRoutes from "./routes/admin/product/product.routes.js";
import deliveryAdminRoutes from "./routes/admin/delivery/delivery.routes.js";
import reviewAdminRoutes from "./routes/admin/review/review.routes.js";
import giftCardAdminRoutes from "./routes/admin/gift-card/giftCard.routes.js";
import orderItemAdminRoutes from "./routes/admin/order-item/orderItem.routes.js";
import orderAdminRoutes from "./routes/admin/order/order.routes.js";
import marketingAdminRoutes from "./routes/admin/marketing/marketing.routes.js";

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
app.use("/api/code-promos/verify-code", codePromoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gift-cards/check-in", giftCardRoutes);

// Reserved routes
app.use("/api/customer", customerPrivateRoutes);
app.use("/api/reviews", reviewReservedRoutes);
app.use("/api/gift-cards", giftCardReservedRoutes);
app.use("/api/payment", paymentReservedRoutes);
app.use("/api/orders", orderReservedRoutes);

// Admin routes
app.use("/api/admin/customers", verifyToken, adminAccess, profileRoutes);
app.use("/api/admin/customers", verifyToken, adminAccess, notesAdminRoutes);
app.use("/api/admin/customers", verifyToken, adminAccess, cashBackAdminRoutes);
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
app.use("/api/admin/reviews", verifyToken, adminAccess, reviewAdminRoutes);
app.use("/api/admin/gift-cards", verifyToken, adminAccess, giftCardAdminRoutes);
app.use(
  "/api/admin/order-items",
  verifyToken,
  adminAccess,
  orderItemAdminRoutes
);
app.use("/api/admin/orders", verifyToken, adminAccess, orderAdminRoutes);
app.use(
  "/api/admin/marketing/campaigns",
  verifyToken,
  adminAccess,
  marketingAdminRoutes
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
