/* LOADER */
const ageText = document.getElementById("ageText");
let count = 0;

let interval = setInterval(() => {
  ageText.textContent = count % 2 === 0 ? "21" : "22";
  count++;

  if (count > 6) {
    clearInterval(interval);
    ageText.textContent = "22";

    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("celebration").classList.remove("hidden");
    }, 1500);
  }
}, 600);


/* CAKE */
const cake = document.getElementById("cake");
const lightBtn = document.getElementById("lightBtn");

lightBtn.addEventListener("click", () => {
  cake.src = "assets/cake-22.png";
  cake.classList.add("glow");

  setTimeout(() => cake.classList.add("cut"), 1000);

  setTimeout(() => {
    cake.style.display = "none";
    document.getElementById("celebration").classList.add("hidden");
    document.getElementById("catSection").classList.remove("hidden");
  }, 2500);
});


/* AUDIO */
const revealMusic = document.getElementById("revealMusic");
const music = document.getElementById("bgMusic");

function playRevealSong() {

  revealMusic.currentTime = 0;
  revealMusic.volume = 1;
    fadeInMusic();
  const playPromise = revealMusic.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {

      setTimeout(() => {
        revealMusic.pause();
        revealMusic.currentTime = 0;
      }, 12000);

    }).catch(err => console.log("Audio play blocked:", err));
  }
}


/* CAT WISH */
function catWish(type) {
  const catDisplay = document.getElementById("catDisplay");

  let msg = "";

  if (type === 1) msg = "You're the cutest 22-year-old in this universe 💖";
  if (type === 2) msg = "He loves you more than infinity times infinity ❤️";
  if (type === 3) msg = "You're 22 but still baby-coded 😼✨";

  catDisplay.innerHTML = `
    <img src="assets/cat1.gif">
    <p id="ms">${msg}</p>
  `;

  document.getElementById("ms").style.color = "red";
}


/* LOVE QUESTION */
function loveQuestion() {

  const catDisplay = document.getElementById("catDisplay");

  catDisplay.innerHTML = `
    <h3>Do you love me? 🥺</h3>
    <div style="margin-top:20px;">
      <button id="yesBtn">Yes 💖</button>
      <button id="noBtn">No 😼</button>
    </div>
    <div id="loveResult" style="margin-top:20px;"></div>
  `;

  const result = document.getElementById("loveResult");

  document.getElementById("noBtn").addEventListener("click", () => {
    result.innerHTML = `
      <img src="assets/sad.png" style="width:220px;">
      <p style="margin-top:10px;font-size:20px;">really?? 😭</p>
    `;
  });

  document.getElementById("yesBtn").addEventListener("click", () => {

    result.innerHTML = `
      <img src="assets/happy.png" style="width:220px;">
      <p style="margin-top:10px;font-size:20px;">
        I knew it babee😌💞 
      </p>
      <button id="surpriseBtn" style="margin-top:15px;">
        See the Surprise 💝
      </button>
    `;

    document.getElementById("wishButtons").style.display = "none";
    document.getElementById("yesBtn").style.display = "none";
    document.getElementById("noBtn").style.display = "none";

    document.getElementById("surpriseBtn").addEventListener("click", () => {
      playRevealSong();
      revealImage();
    });

  });
}


/* REVEAL IMAGE */
function revealImage() {

  const catDisplay = document.getElementById("catDisplay");
  const wishButtons = document.getElementById("wishButtons");

  if (document.getElementById("herImage")) return;

  wishButtons.classList.add("fade-out");
  catDisplay.classList.add("fade-out");

  setTimeout(() => {

    wishButtons.style.display = "none";
    catDisplay.innerHTML = "";
    catDisplay.classList.remove("fade-out");

    document.getElementById("heading").innerText = "Happy Birthday My Love 💝";

    const container = document.createElement("div");
    container.className = "her-container";

    const leftImg = document.createElement("img");
    leftImg.src = "assets/cuty.png";
    leftImg.className = "sideImage";

    const img = document.createElement("img");
    img.src = "assets/her.jpg";
    img.id = "herImage";

    container.appendChild(leftImg);
    container.appendChild(img);
    catDisplay.appendChild(container);

    setTimeout(() => {
      img.classList.add("show");
      leftImg.classList.add("show");
    }, 100);

    startHearts();

    const btn = document.createElement("button");
    btn.textContent = "Start The Memories 🎞🎞";
    btn.style.marginTop = "20px";
    btn.addEventListener("click", goToSlideshow);

    catDisplay.appendChild(btn);

  }, 600);
}


/* HEARTS */
let heartInterval;

function startHearts() {
  heartInterval = setInterval(createHeart, 200);
  setTimeout(() => clearInterval(heartInterval), 8000);
}

function createHeart() {

  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.innerHTML = "💖💚💛";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (20 + Math.random() * 20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}


/* SLIDESHOW */
const totalImages = 32;
let currentIndex = 1;
let slideInterval;

function goToSlideshow() {

  revealMusic.pause();   // stop song2 if still playing

  document.getElementById("catSection").classList.add("hidden");
  document.getElementById("memorySection").classList.remove("hidden");

  music.volume = 0;
  music.play();
  fadeInMusic();

  startAutoSlideshow();
}

function startAutoSlideshow() {

  showImage();

  slideInterval = setInterval(() => {

    if (currentIndex < totalImages) {
      currentIndex++;
      showImage();
    } else {
      clearInterval(slideInterval);
      endShowcase();
    }

  }, 1600);
}

function showImage() {

  const img = document.getElementById("slideImage");

  img.style.opacity = 0;

  setTimeout(() => {

    img.src = `assets/memories/${currentIndex}.jpg`;

    img.onerror = function () {
      img.onerror = null;
      img.src = `assets/memories/${currentIndex}.jpeg`;
    };

    img.style.opacity = 1;

  }, 500);
}

function endShowcase() {

  document.querySelector(".slideshow-box").style.display = "none";
  fadeOutMusic();

  setTimeout(() => {
    document.getElementById("finalMessage").classList.remove("hidden");
  }, 1000);
}


/* MUSIC FADE */
function fadeInMusic() {
  let vol = 0;

  let fade = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

function fadeOutMusic() {
  let fade = setInterval(() => {
    if (music.volume > 0) {
      music.volume -= 0.05;
    } else {
      clearInterval(fade);
      music.pause();
    }
  }, 200);
}
