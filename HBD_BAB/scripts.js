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

    setTimeout(() => {
        cake.classList.add("cut");
    }, 1000);

    setTimeout(() => {
        cake.style.display = "none";
        document.getElementById("celebration").classList.add("hidden");
        document.getElementById("catSection").classList.remove("hidden");
    }, 2500);
});

/* CAT WISH */
function catWish(type){
  const catDisplay = document.getElementById("catDisplay");

  let msg = "";

  if(type===1) msg="You're the cutest 22-year-old in this universe 💖";
  if(type===2) msg="He loves you more than infinity times infinity ❤️";
  if(type===3) msg="You're 22 but still baby-coded 😼✨";

  catDisplay.innerHTML=`
    <img src="assets/cat1.gif">
    <p>${msg}</p>
    <button id="surpriseBtn">See the Surprise 💝</button>
  `;

  document.getElementById("surpriseBtn").addEventListener("click", revealImage);
}

function revealImage(){

  const catDisplay = document.getElementById("catDisplay");
  const wishButtons = document.getElementById("wishButtons");

  if(document.getElementById("herImage")) return;

  // 🔥 Fade out buttons + cat content
  wishButtons.classList.add("fade-out");
  catDisplay.classList.add("fade-out");

  setTimeout(()=>{

    // Remove buttons completely
    wishButtons.style.display = "none";

    // Clear cat content
    catDisplay.innerHTML = "";
    catDisplay.classList.remove("fade-out");

    // Create her image
    const img = document.createElement("img");
    img.src = "assets/her.jpg";
    img.id = "herImage";

    catDisplay.appendChild(img);

    // Animate image in
    setTimeout(()=>{
      img.classList.add("show");
    },100);

    // ❤️ Start hearts
    startHearts();

    // Create Start Memories button
    const btn = document.createElement("button");
    btn.textContent = "Start The Memories 🎞🎞";
    btn.style.marginTop = "20px";
    btn.addEventListener("click", goToSlideshow);

    catDisplay.appendChild(btn);

  }, 600); // wait for fade-out
}



let heartInterval;

function startHearts(){

  heartInterval = setInterval(createHeart, 200);

  // Stop after 6 seconds
  setTimeout(()=>{
    clearInterval(heartInterval);
  }, 8000);
}

function createHeart(){

  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.innerHTML = "💖💚💛";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (20 + Math.random() * 20) + "px";

  document.body.appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  }, 8000);
}




const totalImages = 32;
let currentIndex = 1;
let slideInterval;
const music = document.getElementById("bgMusic");

function goToSlideshow(){
  document.getElementById("catSection").classList.add("hidden");
  document.getElementById("memorySection").classList.remove("hidden");

  music.volume = 0;
  music.play();
  fadeInMusic();

  startAutoSlideshow();
}

function startAutoSlideshow(){
  showImage();

  slideInterval = setInterval(() => {

    if(currentIndex < totalImages){
      currentIndex++;
      showImage();
    } else {
      clearInterval(slideInterval);
      endShowcase();
    }

  }, 1600); // change every 1.5 seconds
}

function showImage(){
  const img = document.getElementById("slideImage");

  img.style.opacity = 0;

  setTimeout(() => {

    img.src = `assets/memories/${currentIndex}.jpg`;

    // If .jpg fails, try .jpeg
    img.onerror = function(){
      img.onerror = null; // prevent infinite loop
      img.src = `assets/memories/${currentIndex}.jpeg`;
    };

    img.style.opacity = 1;

  }, 500);
}

function endShowcase(){

  document.querySelector(".slideshow-box").style.display = "none";

  fadeOutMusic();

  setTimeout(()=>{
    document.getElementById("finalMessage").classList.remove("hidden");
  }, 1000);
}

/* Music fade in */
function fadeInMusic(){
  let vol = 0;
  let fade = setInterval(()=>{
    if(vol < 1){
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

/* Music fade out */
function fadeOutMusic(){
  let fade = setInterval(()=>{
    if(music.volume > 0){
      music.volume -= 0.05;
    } else {
      clearInterval(fade);
      music.pause();
    }
  }, 200);
}
