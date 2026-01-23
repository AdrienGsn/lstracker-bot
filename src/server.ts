import express from "express";

const app = express();

app.get("/", (_, res) => res.send("Bot en ligne"));

const PORT = Number(process.env.PORT) || 4000

const server = app.listen(PORT, "0.0.0.0", () => {
    const addr = server.address();

    console.log("==> Server started");
    console.log(`==> Listening on ${PORT}`);
    console.log(`==> Address: ${JSON.stringify(addr)}`);
});

server.on('error', (err) => {
    console.error("Server error:", err);
    process.exit(1);
});

export default server;