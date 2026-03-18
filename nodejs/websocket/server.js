const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("File not found");
            return;
        }

        const ext = path.extname(filePath);
        const mimeTypes = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8"
        };

        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    const requestedPath = path.join(PUBLIC_DIR, urlPath);

    // Prevent directory traversal.
    if (!requestedPath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    serveStaticFile(requestedPath, res);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    ws.send(JSON.stringify({
        type: "system",
        message: "서버에 연결되었습니다. 닉네임을 입력하고 채팅해 보세요."
    }));

    ws.on("message", (raw) => {
        let payload;

        try {
            payload = JSON.parse(raw.toString());
        } catch {
            ws.send(JSON.stringify({ type: "system", message: "잘못된 메시지 형식입니다." }));
            return;
        }

        const name = (payload.name || "익명").toString().trim().slice(0, 20) || "익명";
        const text = (payload.message || "").toString().trim().slice(0, 300);

        if (!text) {
            return;
        }

        const data = JSON.stringify({
            type: "chat",
            name,
            message: text,
            time: new Date().toLocaleTimeString("ko-KR", { hour12: false })
        });

        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Chat server is running on http://localhost:${PORT}`);
});
