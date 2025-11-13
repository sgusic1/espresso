import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/proxy", async (req, res) => {
  const rawUrl = req.query.url;

  if (typeof rawUrl !== "string") {
    res.status(400).send("Missing or invalid url param");
    return;
  }

  try {
    const targetUrl = decodeURIComponent(rawUrl);
    console.log("Proxy forwarding to:", targetUrl);

    const response = await fetch(targetUrl);
    const text = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
