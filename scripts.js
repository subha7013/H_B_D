document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTS */
  const loader = document.getElementById("loader");
  const celebration = document.getElementById("celebration");
  const catSection = document.getElementById("catSection");
  const memorySection = document.getElementById("memorySection");
  const cake = document.getElementById("cake");
  const lightBtn = document.getElementById("lightBtn");

  const revealMusic = document.getElementById("revealMusic");
  const bgMusic = document.getElementById("bgMusic");

  const ageText = document.getElementById("ageText");

  /* LOADER */
  let count = 0;

  let interval = setInterval(() => {
    ageText.textContent = count % 2 === 0 ? "21" : "22";
    count++;

    if (count > 6) {
      clearInterval(interval);
      ageText.textContent = "22";

      setTimeout(() => {
        loader.style.display = "none";
        celebration.classList.remove("hidden");
      }, 1200);
    }
  }, 600);

  /* CAKE */
  lightBtn.addEventListener("click", () => {
    cake.src = "assets/cake-22.png";
    cake.classList.add("glow");

    setTimeout(() => cake.classList.add("cut"), 1000);

    setTimeout(() => {
      celebration.classList.add("hidden");
      catSection.classList.remove("hidden");
    }, 2200);
  });

  /* ===== GLOBAL FUNCTIONS (IMPORTANT) ===== */

  window.catWish = function (type) {
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
  };

  window.bestFriendQuestion = function () {
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

      document.getElementById("surpriseBtn").onclick = window.revealImage;

    };
  };

  window.revealImage = function () {
    document.getElementById("heading").innerText = "Sit back & enjoy the vibe 😎🎧";
    revealMusic.currentTime = 0;
    revealMusic.play().catch(() => { });
    const catDisplay = document.getElementById("catDisplay");

    catDisplay.innerHTML = "";

    const container = document.createElement("div");
    container.className = "her-container";

    const leftImg = document.createElement("img");
    leftImg.src = "assets/cuty.png";
    leftImg.className = "sideImage";

    const mainImg = document.createElement("img");
    mainImg.src = "assets/her.jpg";
    mainImg.id = "herImage";

    container.appendChild(leftImg);
    container.appendChild(mainImg);
    catDisplay.appendChild(container);

    setTimeout(() => {
      mainImg.classList.add("show");
      leftImg.classList.add("show");
    }, 100);

    const btn = document.createElement("button");
    btn.innerText = "Let's See the Memories 🎞";
    btn.onclick = window.goToSlideshow;

    catDisplay.appendChild(btn);

    startHearts();
  };

  function startHearts() {
    let i = setInterval(() => {
      let h = document.createElement("div");
      h.className = "falling-heart";
      h.innerHTML = "💖";
      h.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(h);

      setTimeout(() => h.remove(), 5000);
    }, 200);

    setTimeout(() => clearInterval(i), 10000);
  }

  /* SLIDESHOW */
  let index = 1;
  const total = 32;

  window.goToSlideshow = function () {

    revealMusic.pause();

    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => { });

    catSection.classList.add("hidden");
    memorySection.classList.remove("hidden");

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
  };

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
    document.querySelector(".slideshow-box").style.display = "none";
    document.getElementById("finalMessage").classList.remove("hidden");
  }

});
