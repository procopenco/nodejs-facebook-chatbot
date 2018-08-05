import express from "express";
import { FacebookController } from "./controllers/facebook.controller";

export class App {
  _app: express.Express;

  public get app() {
    return this._app;
  }

  constructor() {
    this._app = express();

    this.initRoutes();
  }

  private initRoutes(): void {
    this._app.use("/api/v1/facebook", FacebookController);
  }
}
