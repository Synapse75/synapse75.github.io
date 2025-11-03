function loadPage(page) {
  const content = document.getElementById('content');
  const links = document.querySelectorAll('header a'); // 所有导航链接

  // 🔹 切换激活样式
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(page)) {
      link.classList.add('active');
    }
  });

  // 🔹 页面淡出动画
  content.classList.add('hidden');

  setTimeout(() => {
    fetch(page)
      .then(res => res.text())
      .then(html => {
        content.innerHTML = html;
        content.classList.remove('hidden');
      })
      .catch(err => {
        content.innerHTML = "<p>⚠️ 页面加载失败。</p>";
        console.error(err);
      });
  }, 300);
}

window.addEventListener('DOMContentLoaded', () => {
  loadPage('home.html');
});