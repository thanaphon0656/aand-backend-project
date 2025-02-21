import "reflect-metadata";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import mongoose, { connect, set } from "mongoose";
import { useExpressServer } from "routing-controllers";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "./config";
import { dbConnection } from "./databases";
import errorMiddleware from "./middlewares/error.middleware";
import { logger, stream } from "./utils/logger";
import express = require("express");
import cookieParser = require("cookie-parser");
import hpp = require("hpp");

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private static isConnected = false; // Connect DB Duplicate

  constructor(controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("🔥 Unhandled Rejection:", reason);
    });

    // Handle SIGINT (Ctrl+C)
    process.on("SIGINT", () => {
      logger.info("👋 Received SIGINT. Ignoring to keep server running...");
    });

    // Handle SIGTERM
    process.on("SIGTERM", () => {
      logger.info("🚦 SIGTERM received. Ignoring to keep server running...");
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      if (App.isConnected) {
        logger.info("🔄 Already connected to MongoDB. Skipping...");
        return;
      }

      mongoose.set("strictQuery", false);

      if (this.env !== "production") {
        set("debug", false);
      }

      await connect(dbConnection.url);
      App.isConnected = true;
      logger.info("✅ Connected to MongoDB!");
    } catch (error) {
      logger.error("❌ MongoDB Connection Error:", error);

      setTimeout(() => {
        this.connectToDatabase();
      }, 5000);
    }
  }


  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: ORIGIN || "*", // ✅ แก้ไข fallback กรณี `ORIGIN` เป็น `undefined`
        credentials: CREDENTIALS || false,
        allowedHeaders: [
          "X-Requested-With",
          "Content-Type",
          "Authorization",
          "g-recaptcha-token",
        ],
        methods: ["GET", "OPTIONS", "PUT", "POST", "DELETE"],
        exposedHeaders: ["set-cookie"],
        preflightContinue: false,
      },
      routePrefix: "/api",
      controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
