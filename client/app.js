const socket = io();

// 接收新文章通知
socket.on('new_post_alert', (data) => {
  const msg = `🔔 系统通知：${data.author} 刚刚发布了新文章《${data.title}》`;
  const box = document.getElementById('alertBox');
  box.innerHTML = `<div class="alert">${msg}</div>`;
  setTimeout(() => box.innerHTML = '', 5000);
});

// 实时同步输入框
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');

authorInput.addEventListener('input', () => {
  socket.emit('typing_author', authorInput.value);
});
titleInput.addEventListener('input', () => {
  socket.emit('typing_title', titleInput.value);
});

socket.on('sync_author', (val) => {
  authorInput.value = val;
});
socket.on('sync_title', (val) => {
  titleInput.value = val;
});

// 发布文章
async function publish() {
  const author = authorInput.value.trim();
  const title = titleInput.value.trim();
  if (!author || !title) {
    alert('请填写作者和标题');
    return;
  }

  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, title })
  });
  const data = await res.json();
  console.log('发布成功：', data);
}