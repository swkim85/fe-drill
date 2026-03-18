"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type ChatMessage = {
  id: string;
  text: string;
  time: string;
};

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const connectSocket = async () => {
      await fetch("/api/socket");

      const socket = io({ path: "/api/socket/io" });
      socketRef.current = socket;

      socket.on("connect", () => setConnected(true));
      socket.on("disconnect", () => setConnected(false));
      socket.on("chat-message", (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });
    };

    void connectSocket();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !socketRef.current) {
      return;
    }

    socketRef.current.emit("chat-message", text);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-xl">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Next.js WebSocket Demo</h1>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${connected
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
              }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </header>

        <section className="h-80 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">메시지를 보내면 여기에 실시간으로 표시됩니다.</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((m) => (
                <li key={m.id} className="rounded-md bg-white p-3 shadow-sm">
                  <p>{m.text}</p>
                  <p className="mt-1 text-xs text-slate-500">{m.time}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-50"
            disabled={!connected}
          >
            보내기
          </button>
        </form>
      </main>
    </div>
  );
}
