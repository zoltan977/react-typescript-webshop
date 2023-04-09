import * as dotenv from "dotenv";
import {connect, ConnectOptions, connection} from 'mongoose';
import App from "./app";
import { AuthRoutes } from "./routes/AuthRoutes";
import { CartRoutes } from "./routes/CartRoutes";
import { OrderRoutes } from "./routes/OrderRoutes";
import { ProductRoutes } from "./routes/ProductRoutes";
import { TypeRoutes } from "./routes/TypeRoutes";
import { UserAccountRoutes } from "./routes/UserAccountRoutes";

dotenv.config();

(async () => {
    connection.once("open", (_) => {
        console.log("Connected to the database");
      });
    
    connection.on("error", (err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });

    await connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

    const app = new App([
      new AuthRoutes(),
      new TypeRoutes(),
      new ProductRoutes(),
      new CartRoutes(),
      new OrderRoutes(),
      new UserAccountRoutes()
    ]);

    app.listen();
})()
