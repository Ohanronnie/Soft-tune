//let music = document.getElementsByName('music')[0];
//let cover = document.getElementsByName('cover')[0];
/*function mus(y){
let fileread = new FileReader();
fileread.onloadend = () => {
  text = fileread.result;
  alert('wait',text);
  document.getElementById('hidden').value = 'text'
}
alert(y.files[0])
fileread.readAsDataURL(y.files[0])
}
function pics(x){
let fileread = new FileReader();
fileread.onloadend = () => {
  text = fileread.result;
  document.getElementById('hidden2').value = text
}
alert(x)
fileread.readAsDataURL(x.files[0])
}
*/
function meta(){
 jsmediatags.read(event.target.files[0], {
   onSuccess: function(tag) { 

      // Array buffer to base64
   const data = tag.tags.picture.data;
   const format = tag.tags.picture.format;
   let base64String = "";
   for (let i = 0; i < data.length; i++) {
     base64String += String.fromCharCode(data[i]);
   }
  document.getElementById('metadata').value = `data:${format};base64,${window.btoa(base64String)}|${tag.tags.title}|${tag.tags.artist}|${tag.tags.album}`
  },
  onError: function(err){
   alert(err)
  }
});
}
async function list(){
  try{
   let res = await fetch('http://localhost:8080/musicList');
   let re = await res.json();
  /* let req = JSON.parse(re);
   alert(req)
   */for(let resp of re){
   let img = await fetch('http://localhost:8080/images/'+resp.cover)
   let reimg = await img.text();
   let img_cover = await fetch('http://localhost:8080/images/'+re[re.length - 1].cover)
   let recover = await img_cover.text();
   let div = document.querySelector('.box');
   let newdiv = document.createElement('div');
   newdiv.setAttribute('class','recent');
   newdiv.setAttribute('onclick',`playMusic('${reimg}','${resp.title}','${resp.artist}','${resp.location}')`);
   newdiv.innerHTML = `<img src="${reimg}"><p>${resp.title}</p><span>${resp.artist}</span>`
   div.insertAdjacentElement('afterbegin',newdiv);
   let file = `${re[re.length - 1].location}`;
   var audio = new Audio('music/'+ file);
   document.querySelector('.song').innerHTML = `${re[re.length -  1].title}`;
   document.querySelector('.title-cover').innerHTML = `${re[re.length -  1].artist}`;
   document.querySelector('.img-cover').src = `${recover}`;
/*  myff = () =>{
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
        audio.play();
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
  var progress = document.getElementsByClassName('inp')[0];
  progress.max = audio.duration;
  setInterval(() => {
  progress.value = audio.currentTime;
  },1)
}
}*/
 playMusic(`${reimg}`,`${re[re.length - 1].title}`,`${re[re.length - 1].artist}`,`${file}`);
 }
   }
   catch(err){
     alert(err)
  }
}
list()
function playMusic(img,title,artist,music){
   alert(title,artist,music);
   let file = `${music}`;
   let audio = new Audio('music/'+ file);
   document.querySelector('.song').innerHTML = `${title}`;
   document.querySelector('.title-cover').innerHTML = `${artist}`;
   document.querySelector('.img-cover').src = `${img}`;
   let Playing = () => {
    let timeRemaining = audio.duration;
    let seconds = Math.floor(timeRemaining % 60);                                                 var hr = Math.floor(audio.duration/60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    hr = hr < 10 ? "0" + hr : hr;                                                                 dur = audio.duration;                                                                         document.getElementById("hr").innerHTML = hr;
    document.getElementById("min").innerHTML = seconds;
    timeRemaining = audio.duration - audio.currentTime;
    let sec = Math.floor(timeRemaining / 60)
    let milli = Math.floor(timeRemaining % 60);
    if(sec == 0 && milli == 0){
      audio.play();                                                                               }
    }
   /*   sec = sec < 10 ? "0" + sec : sec;
      milli = milli < 10 ? "0" + milli : milli;
      document.getElementById("sec").innerHTML=sec;
      document.getElementById("milli").innerHTML=milli;
    audio.play();
    let change = document.getElementById("play");
    if(change.getAttribute("class") == "fa play fa-play"){
      change.setAttribute("class", "fas fa-pause fa play")
    }
    else{
      change.setAttribute("class", "fa play fa-play");
      audio.pause();
    }
/*   let progress = document.getElementsByClassName('inp')[0];
   progress.max = audio.duration;
   setInterval(() => {
   progress.value = audio.currentTime;
   },1) 
/*myff = () =>{
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
        audio.play();
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
  var progress = document.getElementsByClassName('inp')[0];
  progress.max = audio.duration;
  setInterval(() => {
  progress.value = audio.currentTime;
  },1)*/
   let keepPlaying  = () => {
   setInterval(Playing,1000);
   let change = document.getElementById("play");
    if(change.getAttribute("class") == "fa play fa-play"){
      change.setAttribute("class", "fas fa-pause fa play")
    }
    else{
      change.setAttribute("class", "fa play fa-play");
      audio.pause();
    }
   let progress = document.getElementsByClassName('inp')[0];
   progress.max = audio.duration;
   setInterval(() => {
   progress.value = audio.currentTime;
   },1) 
  }
keepPlaying()
 }

