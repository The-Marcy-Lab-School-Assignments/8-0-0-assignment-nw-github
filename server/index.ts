import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
    res.send(`<html><body>Hello World! <a href="/foo">Foo</a></body></html>`);
});

app.get("/foo", (_req, res) => {
    res.send(`<html><body>At foo! <a href="/">Go Home</a></body></html>`);
});

app.get<{ name?: string }>("/api/v1/foo", (req, res) => {
    let name = req.query.name;
    if (!name) {
        res.status(400);
        res.send("You must provide a name");
    } else {
        res.send(JSON.stringify({ foo: `Hello ${name}` }));
    }
});

app.get("/api/v1/bar", (_req, res) => {
    res.send(JSON.stringify({ bar: "foo" }));
});

app.listen(PORT, () => {
    console.log("running...");
});
