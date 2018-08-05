import { App } from "./app";

class Server {
  _app = new App();

  public listen(): void {
    this._app.app.listen(1234, () => {
      console.log("Server ready");
    });
  }
}

const server = new Server();
server.listen();
