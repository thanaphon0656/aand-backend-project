import { existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import winston = require("winston");
import winstonDaily = require("winston-daily-rotate-file");
import { LOG_DIR } from "./../config";

const logDir: string = resolve(LOG_DIR || "logs");

if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: join(logDir, "debug"), // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: join(logDir, "error"), // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

// Add Console Transport
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize()
    ),
  })
);

// Logging stream for morgan
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, stream };
