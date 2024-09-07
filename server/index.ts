import express, { Express, Request, Response } from "express";
import { environment } from "./types/environment.js";
import { checkConnection } from "./database/check-connection.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());

checkConnection();

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);

// Routes pour les admins (authentifiés + rôle admin)
// app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
