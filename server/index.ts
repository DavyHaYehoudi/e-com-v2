import express, { Express, Request, Response } from "express";
import { environment } from "./types/environment.js";
import { checkConnection } from "./database/check-connection.js";
import errorHandler from "./exceptions/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";

const app: Express = express();
const port = environment.PORT;
app.use(express.json());

checkConnection();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World 😃!");
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
