var audio = new Audio("/Peterson-Okopi-Walk-Away-ej.mp3");
  myff = () =>{
    audio.play();
    setInterval(() => {
      var timeRemaining = audio.duration;
      var seconds = Math.floor(timeRemaining % 60);
      var hr = Math.floor(audio.duration/60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      hr = hr < 10 ? "0" + hr : hr;
      dur = audio.duration;
      document.getElementById("hr").innerHTML = hr;
      document.getElementById("min").innerHTML = seconds;
     var timeRemaining = audio.duration - audio.currentTime;
     var sec = Math.floor(timeRemaining / 60)
     var milli = Math.floor(timeRemaining % 60);
     if(sec == 0 && milli == 0){
      }
     sec = sec < 10 ? "0" + sec : sec;
     milli = milli < 10 ? "0" + milli : milli;
     document.getElementById("sec").innerHTML=sec;
     document.getElementById("milli").innerHTML=milli;
  },1000)
  audio.play();
  var change = document.getElementById("play");
  if(change.getAttribute("class") == "fa play fa-play"){
  change.setAttribute("class", "fas fa-pause fa play")
  }
  else{
  change.setAttribute("class", "fa play fa-play");
  audio.pause();
  }
  var progress = document.getElementsByTagName('input')[0];
  progress.max = audio.duration;
  setInterval(() => {
  progress.value = audio.currentTime;
  },1)
}
