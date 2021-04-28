const musicContainer = document.querySelector(".player-dock");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const artistTitle = document.querySelector("#artist");
const cover = document.querySelector("#cover");

function openNav() {
  document.getElementById("mySideBar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySideBar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// Default track of songs
let songIndex = songs.length - 1;
let artistIndex = artists.length - 1;

// Initially load song info DOM
loadSong(songs[songIndex]);
loadArtist(artists[artistIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
}

function loadArtist(artist) {
  artistTitle.innerText = artist;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Change song
function prevSong() {
  songIndex--;
  artistIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  loadArtist(artists[artistIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  artistIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    artistIndex = 0;
  }

  loadSong(songs[songIndex]);
  loadArtist(artists[artistIndex]);
  playSong();
}

// Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);