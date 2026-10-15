// ハンバーガー／ドロワー
const ham = document.getElementById('ham');
const drawer = document.getElementById('drawer');
function setDrawer(open) {
  ham.classList.toggle('is-open', open);
  drawer.classList.toggle('is-open', open);
  ham.setAttribute('aria-expanded', open);
  drawer.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}
ham.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));

// メインビジュアルのスライド（フェード）
const slides = document.querySelectorAll('.p-mv__slide');
let current = 0;
setInterval(() => {
  slides[current].classList.remove('is-active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('is-active');
}, 5000);

// スクロールでフェードアップ
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-show');
      io.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-anime="fadeUp"]').forEach(el => io.observe(el));

// メールアドレス：迷惑メール業者の自動収集を避けるため、表示時に組み立てる
document.querySelectorAll('.js-mail').forEach(a => {
  const addr = a.dataset.u + '@' + a.dataset.d;
  a.href = 'mailto:' + addr;
  a.querySelector('.js-mail__addr').textContent = addr;
});

// Q&A アコーディオン
document.querySelectorAll('.l-faq__q button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.l-faq__item');
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
  });
});
