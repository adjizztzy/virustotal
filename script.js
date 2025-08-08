const form = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Tampilkan chat user
  appendMessage(userMessage, "user");
  input.value = "";

  try {
    // Kirim ke API DeepSeek
    const res = await fetch(
      "https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=" + encodeURIComponent(userMessage)
    );
    const data = await res.json();

    // Ambil respons
    const aiReply = data.result || "Maaf, tidak ada respon.";
    appendMessage(aiReply, "bot");
  } catch (err) {
    appendMessage("Gagal mengambil respons dari AI.", "bot");
  }
});

function appendMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}
