import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";

export default function ConfiguracoesGlobais(app) {
  dotenv.config();

  //const app = express();
  const port = 4000;
  const uri = process.env.MONGO_URI;

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:4000",
        "http://localhost",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.urlencoded({ extended: true }));

  async function startdb() {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000,
        heartbeatFrequencyMS: 2000,
      });

      console.log("Mongoose conectado com sucesso!");

      app.listen(port, "0.0.0.0", () => {
        console.log(`Express na porta ${port}`);
      });
    } catch (err) {
      console.error("Erro ao conectar ao MongoDB:", err);
    }
  }

  return startdb(); //não sei se isso vai funcionar, eu espero que sim
}
