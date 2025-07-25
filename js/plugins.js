// plugin.js
(() => {
  const API_URL = 'https://your-api-endpoint.com/chat'; // ganti sesuai endpoint

  // Utility: toast notification
  function showToast(msg, duration = 2000) {
    const t = document.createElement('div');
    t.className = 'plugin-toast';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), duration);
  }

  // Voice input (Web Speech API)
  const mic = document.getElementById('mic-btn');
  let recognition;
  if (mic && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    mic.addEventListener('click', () => {
      recognition.start();
      showToast('Listening...');
    });
    recognition.onresult = e => {
      const text = e.results[0][0].transcript;
      document.getElementById('prompt-input').value = text;
      showToast(`You: ${text}`);
    };
    recognition.onerror = err => showToast(`Voice error: ${err.error}`);
  } else {
    mic?.remove(); // jika tidak support speech
  }

  // Submit via button atau Ctrl+Enter
  document.getElementById('send-btn')?.addEventListener('click', sendChat);
  document.getElementById('prompt-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) {
      sendChat();
    }
  });

  function appendChat(role, text) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = role === 'user' ? 'user-msg' : 'bot-msg';
    div.innerText = text;
    log?.appendChild(div);
    log?.scrollTo(0, log.scrollHeight);
  }

  async function sendChat() {
    const input = document.getElementById('prompt-input');
    const prompt = input.value.trim();
    if (!prompt) return;

    appendChat('user', prompt);
    input.value = '';
    showToast('Waiting reply...');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.reply) appendChat('bot', data.reply);
      else showToast('No reply field returned');
    } catch (err) {
      console.error(err);
      showToast(`Error: ${err.message}`);
      appendChat('bot', 'Failed to get reply');
    }
  }
})();
