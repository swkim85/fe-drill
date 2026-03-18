import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";

type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: HTTPServer & {
            io?: IOServer;
        };
    };
};

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponseWithSocket,
) {
    if (!res.socket.server.io) {
        const io = new IOServer(res.socket.server, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        io.on("connection", (socket) => {
            socket.on("chat-message", (text: string) => {
                const payload = {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    text,
                    time: new Date().toLocaleTimeString(),
                };
                io.emit("chat-message", payload);
            });
        });

        res.socket.server.io = io;
    }

    res.status(200).json({ ok: true });
}
