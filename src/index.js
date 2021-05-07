/* ----------- Area for Declare Variable ------------- */
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
function nextSong(Index) {
  songs = songs[Index];
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
const body = document.querySelector("body");
const darkbtn = document.querySelector("#whitemode");

if (localStorage.getItem("whiteStatus")) {
  body.classList.remove("dark");
  body.classList.add("white");
}

darkbtn.addEventListener("click", function () {
  if (localStorage.getItem("whiteStatus")) {
    body.classList.remove("white");
    body.classList.add("dark");
    localStorage.removeItem("whiteStatus");
  } else {
    body.classList.remove("dark");
    body.classList.add("white");
    localStorage.setItem("whiteStatus", "true");
  }
});
