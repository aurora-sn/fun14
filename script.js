const AUDIO_SRC = "romantic_vj.wav";

const audioEl = document.getElementById("bg-audio");
audioEl.src = AUDIO_SRC;
audioEl.volume = 0.15;

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const responseBox = document.getElementById("response");
const altMessage = document.getElementById("alt-message");
const countdownEl = document.getElementById("countdown");
const heartsContainer = document.getElementById("floating-hearts");

function tryAutoplay() {
  audioEl
    .play()
    .catch(() => {
      const resume = () => {
        audioEl.play().catch(() => {});
        document.removeEventListener("click", resume);
      };
      document.addEventListener("click", resume, { once: true });
    });
}

window.addEventListener("load", tryAutoplay);

function nextValentine() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 1, 14, 0, 0, 0);
  if (now > target) {
    target = new Date(year + 1, 1, 14, 0, 0, 0);
  }
  return target;
}

const targetDate = nextValentine();

function pad(value) {
  return value.toString().padStart(2, "0");
}

function renderCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "C’est le grand jour !";
    altMessage.textContent = "Je suis déjà prêt à célébrer avec toi. 💘";
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  countdownEl.innerHTML = `
    <span>${pad(days)}j</span>
    <span>${pad(hours)}h</span>
    <span>${pad(minutes)}m</span>
    <span>${pad(seconds)}s</span>
  `;

  altMessage.textContent = `J-${days} avant notre rendez-vous étoilé. ✨`;
}

setInterval(renderCountdown, 1000);
renderCountdown();

function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const safeX = Math.max(0, window.innerWidth - rect.width - 20);
  const safeY = Math.max(0, window.innerHeight - rect.height - 20);
  const nextX = Math.random() * safeX + 10;
  const nextY = Math.random() * safeY + 10;
  noBtn.style.position = "fixed";
  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

let heartInterval = null;

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heart.style.animationDuration = `${4 + Math.random() * 3}s`;
  heart.style.opacity = `${0.6 + Math.random() * 0.4}`;
  heartsContainer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function launchHearts() {
  for (let i = 0; i < 24; i += 1) {
    setTimeout(spawnHeart, i * 120);
  }
  if (!heartInterval) {
    heartInterval = setInterval(spawnHeart, 450);
    setTimeout(() => {
      clearInterval(heartInterval);
      heartInterval = null;
    }, 8000);
  }
}

yesBtn.addEventListener("click", () => {
  responseBox.classList.remove("hidden");
  altMessage.textContent = "J’étais sûr que tu dirais oui 💐💖 Rendez-vous le 14 février.";
  launchHearts();
});
