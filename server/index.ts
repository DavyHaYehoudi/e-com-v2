import express, { Express, Request, Response } from "express";
import { environment } from "./config/environment.js";

const app: Express = express();
const port = environment.PORT;
const db = environment.DB_HOST;


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World 😃!");
});

app.listen(port, () => {
  console.log(`Server running at http://${db}:${port}`);
});
