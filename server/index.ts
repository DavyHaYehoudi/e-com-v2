import express, { Express, Request, Response } from "express";
import { environment } from "./types/environment.js";
import { checkConnection } from "./database/check-connection.js";
import { query } from "./config/req.js";

const app: Express = express();
const port = environment.PORT;

checkConnection()
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World 😃!");
});
app.get("/data", async (req: Request, res: Response) => {
    try {
      const data = await query("SELECT * FROM tag");
      console.log('data:', data)
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 