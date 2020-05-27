class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentkick = "allSounds/kick-classic.wav";
    this.currentsnare = "allSounds/snare-808.wav";
    this.currenthihat = "allSounds/hihat-reso.wav";
    this.kickaudio = document.querySelector(".kick-sound");
    this.snareaudio = document.querySelector(".snare-sound");
    this.hihataudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickaudio.currentTime = 0;
          this.kickaudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareaudio.currentTime = 0;
          this.snareaudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihataudio.currentTime = 0;
          this.hihataudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Pause";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickaudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareaudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihataudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      console.log(e.target);
      switch (muteIndex) {
        case "0":
          this.kickaudio.volume = 0;
          break;
        case "1":
          this.snareaudio.volume = 0;
          break;
        case "2":
          this.hihataudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickaudio.volume = 1;
          break;
        case "1":
          this.snareaudio.volume = 1;
          break;
        case "2":
          this.hihataudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    console.log(e.target.value);
    tempoText.innerHTML = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
const drumkit = new Drumkit();

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playBtn.addEventListener("click", function () {
  drumkit.updateBtn();
  drumkit.start();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});

drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.updateTempo();
});
