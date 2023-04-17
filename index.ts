const express = require("express");
import { db } from "./config/db";
const cors = require("cors");

const app = express();
const PORT = 3333;
app.use(cors());
app.use(express.json());

// Users

app.get("/api/get/users", (req: any, res: any) => {
  db.query("SELECT * FROM db_lista_compras.user", (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/get/user/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.user WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/create/user", (req: any, res: any) => {
  const { id, name, email, user, password } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.user(id, name, email, user, password) VALUES (?, ?, ?, ?, ?)`,
    [id, name, email, user, password],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.delete("/api/delete/user/:id", (req: any, res: any) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM db_lista_compras.user WHERE id= ?",
    id,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Products

app.get("/api/get/products", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.product",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/get/product/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.product WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/create/product", (req: any, res: any) => {
  const { id, name, brand, price, expiration_date, description } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.product(id, name, brand, price, expiration_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, brand, price, expiration_date, description],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.delete("/api/delete/product/:id", (req: any, res: any) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM db_lista_compras.product WHERE id= ?",
    id,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Cart Product

app.get("/api/get/cart_products", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.cart_product",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/get/cart_product/:shopping_cart_id", (req: any, res: any) => {
  const { shopping_cart_id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.cart_product WHERE shopping_cart_id = ?",
    [shopping_cart_id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/create/cart_product", (req: any, res: any) => {
  const {
    shopping_cart_id,
    product_id,
    quantity,
    created_at,
    total_value,
    product_value,
  } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.cart_product(shopping_cart_id, product_id, quantity, created_at, total_value, product_value) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      shopping_cart_id,
      product_id,
      quantity,
      created_at,
      total_value,
      product_value,
    ],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.delete(
  "/api/delete/cart_product/:shopping_cart_id",
  (req: any, res: any) => {
    const shopping_cart_id = req.params.shopping_cart_id;

    db.query(
      "DELETE FROM db_lista_compras.cart_product WHERE shopping_cart_id= ?",
      shopping_cart_id,
      (err: any, result: any) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
);

// Shopping Cart

app.get("/api/get/shopping_cart", (req: any, res: any) => {
  db.query(
    "SELECT * FROM db_lista_compras.shopping_cart",
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/get/shopping_cart/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM db_lista_compras.shopping_cart WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/create/shopping_cart", (req: any, res: any) => {
  const { id, total_value, status, created_at, updated_at, user_id } = req.body;
  db.query(
    `INSERT INTO db_lista_compras.shopping_cart(id, total_value, status, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, total_value, status, created_at, updated_at, user_id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.delete(
  "/api/delete/shopping_cart/:shopping_cart_id",
  (req: any, res: any) => {
    const shopping_cart_id = req.params.shopping_cart_id;

    db.query(
      "DELETE FROM db_lista_compras.shopping_cart WHERE shopping_cart_id= ?",
      shopping_cart_id,
      (err: any, result: any) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
);

app.put("/api/update/shopping_cart/:id", (req: any, res: any) => {
  const id = req.params.id;
  const { total_value, status, created_at, updated_at, user_id } = req.body;
  db.query(
    `UPDATE db_lista_compras.shopping_cart SET status = '${status}', total_value = ${total_value}, created_at = '${created_at}', updated_at = '${updated_at}', user_id = ${user_id} WHERE id = ${id}`,
    (err: any, result: any) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
