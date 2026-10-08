(function () {
  const MAX_TURNS = 12;
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const count = document.getElementById('chat-count');
  const starters = document.getElementById('chat-starters');
  const reset = document.getElementById('chat-reset');
  const greeting = log.firstElementChild.cloneNode(true);
  let history = [];
  let busy = false;

  // AI側の返信に添えるキャラクター（冒頭の挨拶は bot3 から始まる）
  const AVATARS = ['bot3', 'bot2', 'bot1', 'bot4', 'bot5'];
  let botIndex = 1;

  function addMessage(kind, text) {
    const el = document.createElement('div');
    el.className = `chat-msg ${kind}`;
    el.textContent = text;
    if (kind === 'bot') {
      const row = document.createElement('div');
      row.className = 'chat-row';
      const img = document.createElement('img');
      img.className = 'chat-avatar';
      img.src = `images/chat/${AVATARS[botIndex++ % AVATARS.length]}.webp`;
      img.alt = '';
      img.width = 56;
      img.height = 70;
      row.append(img, el);
      log.appendChild(row);
    } else {
      log.appendChild(el);
    }
    log.scrollTop = log.scrollHeight;
    return el;
  }

  // AI の返答の下に出す候補ボタン。新しい発言が始まったら消す
  function clearChoices() {
    log.querySelectorAll('.chat-choices').forEach((el) => el.remove());
  }

  function addChoices(choices) {
    if (!choices || !choices.length) return;
    const group = document.createElement('div');
    group.className = 'chat-choices';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', '返信の候補');
    for (const text of choices) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill';
      btn.textContent = text;
      btn.addEventListener('click', () => submit(text));
      group.appendChild(btn);
    }
    log.appendChild(group);
    log.scrollTop = log.scrollHeight;
  }

  function setBusy(on) {
    busy = on;
    send.disabled = on;
    send.querySelector('span').textContent = on ? '考えています…' : '送る';
  }

  async function submit(text) {
    if (busy) return;
    const content = text.trim();
    if (!content) return;
    clearChoices();
    history.push({ role: 'user', content });
    history = history.slice(-MAX_TURNS);
    addMessage('user', content);
    input.value = '';
    updateCount();
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '応答を取得できませんでした');
      history.push({ role: 'assistant', content: data.reply });
      addMessage('bot', data.reply);
      addChoices(data.choices);
    } catch (e) {
      history.pop();
      addMessage('error', `エラー：${e.message}。少し時間をおいて、もう一度お試しください。`);
    } finally {
      setBusy(false);
      input.focus();
    }
  }

  function updateCount() {
    count.textContent = `${input.value.length} / 1000`;
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    submit(input.value);
  });
  input.addEventListener('input', updateCount);
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && (ev.metaKey || ev.ctrlKey)) {
      ev.preventDefault();
      submit(input.value);
    }
  });
  starters.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-starter]');
    if (!btn) return;
    input.value = btn.dataset.starter;
    updateCount();
    input.focus();
  });
  reset.addEventListener('click', () => {
    if (busy) return;
    history = [];
    botIndex = 1;
    clearChoices();
    log.replaceChildren(greeting.cloneNode(true));
    input.value = '';
    updateCount();
    input.focus();
  });
})();
