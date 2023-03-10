let port = window.location.origin;
/* async function lastplayed(){
   let respo = await fetch(port + '/lastPlayedList');
   let respon_list = await respo.json();
   let respon = [];
   for(let i of respon_list){
     if(respon.indexOf(respon.find(value => value.cover === i.cover)) == -1){
       respon.push(i)
     }
   }
   //let respon = [...new Map(respon_all.map((item) => [item["id"], item])).values()];
   //let respon = [...new Set(respon_all)];
   let response = await fetch(port + '/musicList');
   let music_list = await response.json();
  /* let req = JSON.parse(re);
   alert(req)
   for(let rest of respon){
   let img = await fetch(port + '/images/'+rest.cover);
   let img_cover = await fetch(port + '/images/'+respon[respon.length - 1].cover)
   let reimg = await img.text();
   let recover = await img_cover.text();
   let div = document.querySelector('.box');
   let newdiv = document.createElement('div');
   newdiv.setAttribute('class','recent');
   newdiv.setAttribute('data-src',`${rest.cover}`);
   newdiv.setAttribute('onclick',`setStreams(this);loadTrack('${music_list.indexOf(music_list.find(value => value.cover === rest.cover))}')`);
   newdiv.innerHTML = `<img src="${reimg}"><p>${rest.title}</p><span>${rest.album}</span>`
  // div.insertBefore(newdiv,document.querySelector('view-more'));
   div.insertAdjacentElement( 'afterbegin', newdiv);
   let file = `${respon[respon.length - 1].location}`;
   var audio = new Audio('/music/'+file);
   document.querySelector('.song').innerHTML = `${respon[respon.length -1].title}`;
   document.querySelector('.title-cover').innerHTML = `${respon[respon.length - 1].album}`;
   document.querySelector('.img-cover').src = `${recover}`;
 }
 document.body.setAttribute('class','aria');
}
*/
function load(){
  if(document.getElementsByClassName('aria').length == 0){
    document.querySelector('.div').setAttribute('style','visibility: hidden')
  }
 else{
  document.querySelector('.preload').style.display = "none";
  document.querySelector('.div').setAttribute('style','visibility: visible')
 }
}
//setInterval(load,1)
//let now_playing = document.querySelector(".now-playing");
     let updateTimer;
     let track_index = 0;
     let track_art = document.querySelector(".div .footer .img-cover-last");
     let track_name = document.querySelector(".div .footer .song-last");
     let track_artist = document.querySelector(".div .footer .title-cover-last");
     let playpause_btn = document.querySelector("#play");
     let next_btn = document.querySelector(".forward");
     let prev_btn = document.querySelector(".backward");
     let seek_slider = document.querySelector(".slider");
//let volume_slider = document.querySelector(".volume_slider");
     let curr_hour = document.querySelector("#hr");
     let curr_min = document.querySelector("#min");
     let total_hour = document.querySelector("#sec");
     let total_min = document.querySelector("#milli");
     let curr_track = document.createElement('audio');
//let total_duration = document.querySelector(".total-duration");
//     track_index = 0;
     let isPlaying = false;
     let updateTime;
// Create new audio element
     let track_list = 0;
  async function disp(){
    let x = await fetch(port + '/musicList');
    let response = await x.json()
    track_list = response
//console.log(trackList)
// Define the tracks that have to be played
    console.log(track_list)
    loadTrack(Math.floor(Math.random() * response.length))
   }    
//console.log(track_list)
 function random_bg_color() {
    console.log(' ')
   }

 async function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = '/music/'+track_list[track_index].location;
  console.log(curr_track.src)
  curr_track.load();
  curr_track.play();
  let image = "";
  let resp = await fetch(port + '/images/'+track_list[track_index].cover)
  let re = await resp.text();
  image = re;
  track_art.src = image;
  track_name.textContent = track_list[track_index].title;
  track_artist.textContent = track_list[track_index].album;
  //now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  seekUpdate()
  updateTimer = setInterval(rest, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
 }
 function rest(){
    seekUpdate()
  }
 function resetValues() {
  curr_hour.textContent = "00";
  total_hour.textContent = "00";
  curr_min.textContent = "00";
  total_min.textContent = "00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
 function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

 function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause"></i>';
}

 function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play"></i>';;
}

 function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

 function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

 function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

 function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

 function seekUpdate() {
  seekPosition = 0;
  console.log(curr_track);
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    currentMinutes = Math.floor(curr_track.currentTime / 60);
    currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    durationMinutes = Math.floor(curr_track.duration / 60);
    durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_hour.textContent = currentMinutes;
    curr_min.textContent = currentSeconds;
    total_hour.textContent = durationMinutes;
    total_min.textContent = durationSeconds;
  }
 }
function playIt(){
  if(isPlaying == true){
    playpause_btn.innerHTML = '<i class="fa fa-pause"></i>';
  }
  else{
    playpause_btn.innerHTML = '<i class="fa fa-play"></i>';
 }
}
setInterval(playIt,1)
disp()

