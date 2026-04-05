document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const loader = document.getElementById("loader");
  const ageText = document.getElementById("ageText");

  const celebPage = document.getElementById("celebration-page");
  const celebBtn = document.getElementById("celeb-master-btn");
  const celebHint = document.getElementById("celeb-hint");
  const celebration = document.getElementById("celebration");
  const cake = document.getElementById("cake");
  const lightBtn = document.getElementById("lightBtn");

  const catSection = document.getElementById("catSection");
  const memorySection = document.getElementById("memorySection");

  const revealMusic = document.getElementById("revealMusic");
  const bgMusic = document.getElementById("bgMusic");

  /* =========================
     LOADER
  ========================= */
  let count = 0;

  let interval = setInterval(() => {
    ageText.textContent = count % 2 === 0 ? "21" : "22";
    count++;

    if (count > 6) {
      clearInterval(interval);
      ageText.textContent = "22";

      setTimeout(() => {
        loader.style.display = "none";
        celebPage.classList.add("active");
      }, 1200);
    }
  }, 600);
  initFairyLights();
  /* =========================
     LIGHTS + BALLOONS FLOW
  ========================= */
  let step = 1;

  celebBtn.addEventListener("click", () => {

    if (step === 1) {
      document.body.classList.add("lights-on");

      const lights = document.getElementById("fairy-lights-container");
      lights.style.opacity = "1";
      lights.style.pointerEvents = "none"; // prevents blocking clicks

      celebHint.innerText = "Let’s celebrate 🎈";
      celebBtn.innerText = "🎈 Fly Balloons";

      step++;
    }
    else if (step === 2) {
      launchBalloons();
      startHearts();
      celebBtn.innerText = "✨ Continue";

      step++;
    }

    else if (step === 3) {
      celebPage.classList.remove("active");
      celebration.classList.remove("hidden");
    }

  });

  /* =========================
     CAKE
  ========================= */
  lightBtn.addEventListener("click", () => {

    cake.src = "assets/cake-22.png";
    cake.classList.add("glow");

    setTimeout(() => cake.classList.add("cut"), 1000);

    setTimeout(() => {
      celebration.classList.add("hidden");
      catSection.classList.remove("hidden");
    }, 2200);

  });

});
function initFairyLights() {

  const container = document.getElementById('fairy-lights-container');
  const path = document.getElementById('wire-path');

  const pathLength = path.getTotalLength();
  const bulbCount = 25;

  for (let i = 0; i <= bulbCount; i++) {

    const distance = (i / bulbCount) * pathLength;
    const point = path.getPointAtLength(distance);

    const bulb = document.createElement('div');
    bulb.classList.add('bulb-teardrop');

    bulb.style.left = `${(point.x / 1000) * 100}%`;
    bulb.style.top = `${point.y}px`;

    container.appendChild(bulb);
  }
}

/* =========================
   BALLOONS
========================= */
function launchBalloons() {

  const colors = [
    ['#ff2d55', '#800020'],
    ['#74b9ff', '#0984e3'],
    ['#55efc4', '#00b894'],
    ['#ffeaa7', '#fdcb6e'],
    ['#a29bfe', '#6c5ce7']
  ];

  let interval = setInterval(() => {

    const b = document.createElement("div");
    const shine = document.createElement("div");

    b.className = "balloon";
    shine.className = "balloon-shine";

    const gradient = colors[Math.floor(Math.random() * colors.length)];

    b.style.left = Math.random() * 95 + "vw";
    b.style.background = `radial-gradient(circle at 70% 30%, ${gradient[0]}, ${gradient[1]})`;

    b.appendChild(shine);
    document.body.appendChild(b);

    setTimeout(() => b.remove(), 8000);

  }, 400);

  setTimeout(() => clearInterval(interval), 5000);
}


/* =========================
   CAT SECTION
========================= */
function catWish(type) {

  const catDisplay = document.getElementById("catDisplay");

  let msg = "", pic = "";

  if (type === 1) {
    msg = "You're the coolest , mastikhor , ziddi , Pareshan karne bali 22-year-old kid 😎✨";
    pic = "cat1.gif";
  } else {
    msg = "Best friends like you are rare , feeling proud to have you... 💫";
    pic = "cat2.jpg";
  }

  catDisplay.innerHTML = `
    <img src="assets/${pic}">
    <p>${msg}</p>
  `;
}


/* =========================
   BEST FRIEND
========================= */
function bestFriendQuestion() {

  document.getElementById("wishButtons").classList.add("hidden");

  const catDisplay = document.getElementById("catDisplay");

  catDisplay.innerHTML = `
    <h3>Are you the best friend ever? 😎</h3>
    <button id="yesBtn">Obviously 😌</button>
    <button id="noBtn">Maybe 🤔</button>
    <div id="result"></div>
  `;

  const result = document.getElementById("result");

  document.getElementById("noBtn").onclick = () => {
    result.innerHTML = `
      <img src="assets/sad.png" width="200">
      <p>Think again...😑</p>
    `;
  };

  document.getElementById("yesBtn").onclick = () => {

    result.innerHTML = `
      <img src="assets/happy.png" width="200">
      <p>I knew it 😎🔥</p>
      <button id="surpriseBtn">See the Surprise 🎁</button>
    `;

    document.getElementById("surpriseBtn").onclick = revealImage;

  };
}


/* =========================
   REVEAL
========================= */

function revealImage() {

  document.getElementById("heading").innerText = "Sit back & enjoy the vibe 😎🎧";

  const revealMusic = document.getElementById("revealMusic");
  revealMusic.currentTime = 0;
  revealMusic.play().catch(() => { });

  const catDisplay = document.getElementById("catDisplay");

  catDisplay.innerHTML = "";

  // 🎯 CONTAINER
  const container = document.createElement("div");
  container.className = "her-container";

  // 👶 LEFT FLOATING KID
  const leftImg = document.createElement("img");
  leftImg.src = "assets/cuty.png";   // 👈 your balloon kid
  leftImg.className = "sideImage";

  // 👩 MAIN IMAGE
  const mainImg = document.createElement("img");
  mainImg.src = "assets/her.jpg";
  mainImg.id = "herImage";

  // ADD BOTH
  container.appendChild(leftImg);
  container.appendChild(mainImg);

  catDisplay.appendChild(container);

  // ✨ ANIMATION TRIGGER
  setTimeout(() => {
    mainImg.classList.add("show");
    leftImg.classList.add("show");
  }, 100);

  // 🎬 BUTTON
  const btn = document.createElement("button");
  btn.innerText = "Let's See the Memories 🎞";
  btn.onclick = goToSlideshow;

  catDisplay.appendChild(btn);

  stopHearts(); // keep your logic
}



/* =========================
   SLIDESHOW + HEARTS
========================= */
let index = 1;
const total = 32;
let heartInterval;

function goToSlideshow() {

  document.getElementById("catSection").classList.add("hidden");
  document.getElementById("memorySection").classList.remove("hidden");
  revealMusic.pause();
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.play().catch(() => { });

  showImage();

  let slide = setInterval(() => {

    if (index < total) {
      index++;
      showImage();
    } else {
      clearInterval(slide);
      endShow();
    }

  }, 1500);
}

function showImage() {

  const img = document.getElementById("slideImage");

  img.style.opacity = 0;

  setTimeout(() => {
    img.src = `assets/memories/${index}.jpg`;

    img.onerror = () => {
      img.src = `assets/memories/${index}.jpeg`;
    };

    img.style.opacity = 1;
  }, 400);
}

function endShow() {
  document.getElementById("mem").style.display = "none";
  document.querySelector(".slideshow-box").style.display = "none";
  document.getElementById("finalMessage").classList.remove("hidden");
}


/* =========================
   HEARTS
========================= */
function startHearts() {
  heartInterval = setInterval(() => {

    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);

  }, 200);
}

function stopHearts() {
  clearInterval(heartInterval);
}
