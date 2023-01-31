"use strict";

const functions = require("firebase-functions");
const nextConfig = require("./next.config.js");

const log = (tolog) => functions.logger.log(tolog);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev,
  conf: { distDir: "build", ...nextConfig },
});
const handle = nextApp.getRequestHandler();

exports.server = functions
  .runWith({
    // Ensure the function has enough memory and time
    // to process large files
    timeoutSeconds: 300,
    memory: "512MB",
    minInstances: 1,
    maxInstances: 10,
  })
  .https.onRequest((request, response) => {
    // log the page.js file or resource being requested
    log(`File: ${request.originalUrl}`);
    return nextApp.prepare().then(() => handle(request, response));
  });
