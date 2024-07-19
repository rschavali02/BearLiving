import express from "express";
import mongoose from "mongoose";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import bodyParser from "body-parser";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

  // Define email schema
  const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

  const Email = mongoose.model('Email', emailSchema);

  // Middleware
  app.use(bodyParser.json());

  // Email endpoint
  app.post('/api/email', async (req, res) => {
    const { email, message } = req.body;

    const newEmail = new Email({ email, message });
    try {
      await newEmail.save();
      res.status(201).json(newEmail);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  });

  // tRPC middleware
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Next.js handler
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started');

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
