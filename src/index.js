/* ----------- Area for Declare Variable ------------- */
// metadata
// const songs = require("../data/songs.json");
// const artists = require("../data/artists.json");

// music-player
const musicContainer = document.querySelector(".player-dock");

// control button
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

// audio element
const audio = document.querySelector("#audio");

// progress element
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

// volume element
const volumeContainer = document.querySelector(".volume-maxsize");
const volumeSize = document.querySelector(".volume-size");
const volIcon = document.querySelector("#volume");

// metadata
const title = document.querySelector("#title");
const artistTitle = document.querySelector("#artist");
const cover = document.querySelector("#cover");

// white/dark icon
const wdIcon = document.querySelector("#whitemode");
const body = document.querySelector("body");

// Homepage buttom
function gotoHome() {
  window.open("/", "_self");
}

/* --------------------- INDEX SCRIPT ------------------------- */
/* -------- Functions for Music Player --------- */
// Default track of songs
let songIndex = 1;
let artistIndex = 1;

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

// Pick song
function pickSong(Index) {
  loadSong(songs[Index]);
  loadArtist(artists[Index]);
  songIndex = Index;
  artistIndex = Index;
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

// Audio Volume
audio.volume = 0.7;
volumeSize.style.width = "70%";
function volDown() {
  volIcon.querySelector("i.fas").classList.remove("fa-volume-up");
  volIcon.querySelector("i.fas").classList.add("fa-volume-down");
}
function volUp() {
  volIcon.querySelector("i.fas").classList.add("fa-volume-up");
  volIcon.querySelector("i.fas").classList.remove("fa-volume-down");
}
function setVolume(e) {
  let currentVol = audio.volume;
  const width = this.clientWidth;
  const clickX = e.offsetX;

  currentVol = (clickX / width) * 1.0;
  audio.volume = currentVol;
  const volPercent = (currentVol / 1.0) * 100;
  volumeSize.style.width = `${volPercent}%`;

  if (currentVol <= 0.6) {
    volDown();
  } else {
    volUp();
  }
}

// Player's Event Listeners
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
volumeContainer.addEventListener("click", setVolume);
audio.addEventListener("ended", nextSong);

// white mode

if (localStorage.getItem("whiteStatus")) {
  wdIcon.querySelector("i.far").classList.remove("fa-moon");
  wdIcon.querySelector("i.far").classList.add("fa-sun");
  body.classList.remove("dark");
  body.classList.add("white");
}

wdIcon.addEventListener("click", function () {
  if (localStorage.getItem("whiteStatus")) {
    wdIcon.querySelector("i.far").classList.remove("fa-sun");
    wdIcon.querySelector("i.far").classList.add("fa-moon");
    body.classList.remove("white");
    body.classList.add("dark");
    localStorage.removeItem("whiteStatus");
  } else {
    // wdIcon.querySelector("i.fas").classList.remove("fa-moon");
    wdIcon.querySelector("i.far").classList.remove("fa-moon");
    wdIcon.querySelector("i.far").classList.add("fa-sun");
    body.classList.remove("dark");
    body.classList.add("white");
    localStorage.setItem("whiteStatus", "true");
  }
});

// append search mobile
let searchBar = document.querySelector(".search-bar");
let searchInput = document.querySelector("#search");
let searchIcon = document.querySelector("#searchIcon");
searchBar.addEventListener("click", () => {
  searchBar.style.transition = "0.25s";
  searchIcon.style.display = "none";
  searchBar.style.borderRadius = "20px";
  setTimeout(() => {
    searchBar.style.padding = "0 0 0 20px";
  }, 100);
  setTimeout(() => {
    searchBar.style.width = "172px";
  }, 100);
  searchInput.style.display = "inline";
  searchInput.style.width = "70%";
  setTimeout(() => {
    searchIcon.style.display = "block";
    searchIcon.style.padding = "12px 20px"
  }, 500);
});

// append player
let musicPlayer = document.querySelector("#musicPlayer");
let showPlayer = document.querySelector(".show-player");
let hidePlayer = document.querySelector(".hide-player");
let volControl = document.querySelector(".control-volume");
let metaInfo = document.querySelector(".meta-info");

function appendPlayer() {
  musicPlayer.style.height = "37%";
  musicPlayer.style.top = "60%";
  musicPlayer.style.padding = "15px 10px";
  musicPlayer.style.display = "block";
  title.style.width = "200px";
  artistTitle.style.width = "200px";
  showPlayer.style.display = "none";
  hidePlayer.style.display = "inline";
  hidePlayer.style.padding = "0px 0px 0px 50px";
  progressContainer.style.display = "block";
  progressContainer.style.width = "90%";
  progress.style.display = "block";
  volControl.style.display = "flex";
  volControl.style.position = "absolute";
  volControl.style.right = "10%";
  prevBtn.style.display = "inline";
  nextBtn.style.display = "inline";
}

function removePlayer() {
  musicPlayer.style.height = "60px";
  musicPlayer.style.top = "90%";
  musicPlayer.style.padding = "0px 0px";
  musicPlayer.style.display = "flex";
  title.style.width = "100%";
  artistTitle.style.width = "100%";
  hidePlayer.style.display = "none";
  showPlayer.style.display = "inline";
  hidePlayer.style.padding = "0px 0px 0px 0px";
  progressContainer.style.display = "none";
  progressContainer.style.width = "100%";
  progress.style.display = "none";
  volControl.style.display = "none";
  volControl.style.position = "absolute";
  volControl.style.right = "0";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}
