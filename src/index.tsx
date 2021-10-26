import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Web Site",
          type: "deposit",
          amount: 1000.0,
          category: "dev",
          createdAt: new Date("2021-02-13 09:00:00"),
        },
        {
          id: 2,
          title: "Humburguer",
          type: "withdraw",
          amount: 30.0,
          category: "food",
          createdAt: new Date("2021-02-11 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
