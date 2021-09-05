const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const fs = require("fs");
const url = require("url");
const path = require("path");

//konfigurasi
app.set("view engine", "ejs");
app.use(expressLayout);

//built-in middleware
app.use(express.static("public"));

const server = app
  .use("/", (req, res) => {
    const urlNow = url.parse(req.originalUrl, true);

    if (urlNow.pathname !== "/") {
      if (!fs.existsSync("./page" + urlNow.pathname + ".ejs")) {
        app.set("views", "");
        return res.render("index", {
          layout: "page/layouts/main-layout.ejs",
          title: "home",
        });
      }
      app.set("views", "page");
      return res.render(urlNow.pathname.substring(1), {
        layout: "layouts/main-layout.ejs",
        title: urlNow.pathname.substring(1),
      });
    }
    app.set("views", "");
    return res.render("index", {
      layout: "page/layouts/main-layout.ejs",
      title: "Home",
    });
  })
  .listen(8080, () => console.log("Server running in port 8080"));

exports.run = server;
