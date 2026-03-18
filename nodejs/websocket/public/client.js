const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const nameEl = document.getElementById("name");
const messageEl = document.getElementById("message");

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(`${protocol}//${window.location.host}`);

function appendMessage(text, type = "chat") {
    const item = document.createElement("div");
    item.className = `message ${type}`;
    item.textContent = text;
    messagesEl.appendChild(item);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

socket.addEventListener("open", () => {
    appendMessage("연결 성공", "system");
});

socket.addEventListener("close", () => {
    appendMessage("연결 종료", "system");
});

socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "system") {
        appendMessage(`[안내] ${data.message}`, "system");
        return;
    }

    if (data.type === "chat") {
        appendMessage(`[${data.time}] ${data.name}: ${data.message}`, "chat");
    }
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    if (socket.readyState !== WebSocket.OPEN) {
        appendMessage("서버와 연결되어 있지 않습니다.", "system");
        return;
    }

    const payload = {
        name: nameEl.value.trim() || "익명",
        message: messageEl.value.trim()
    };

    if (!payload.message) {
        return;
    }

    socket.send(JSON.stringify(payload));
    messageEl.value = "";
    messageEl.focus();
});
