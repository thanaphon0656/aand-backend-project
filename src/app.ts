import "reflect-metadata";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { useExpressServer } from "routing-controllers";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config";
import { dbConnection } from "@databases";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(controllers: Function[]) {
    try {
      this.app = express();
      this.env = NODE_ENV || "development";
      this.port = PORT || 3000;
      this.connectToDatabase();
      this.initializeMiddlewares();
      this.initializeRoutes(controllers);
      this.initializeSwagger();
      this.initializeErrorHandling();
    } catch (error) {
      logger.error(error);
    }
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      set("debug", false);
    }

    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        logger.info(`Connected to MongoDB!`);
      })
      .catch((err) => {
        logger.error(err);
      });
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
        origin: ORIGIN,
        credentials: CREDENTIALS,
        allowedHeaders: [
          "X-Requested-With",
          "Content-Type",
          "Authorization",
          "g-recaptcha-token",
        ],
        methods: "GET,OPTIONS,PUT,POST,DELETE",
        exposedHeaders: ["set-cookie"],
        preflightContinue: false,
      },
      routePrefix: "/api",
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
