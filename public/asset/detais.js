async function list(){
  try{
   let res = await fetch('http://localhost:8080/musicList');
   let re = await res.json();
  /* let req = JSON.parse(re);
   alert(req)
   */for(let resp of re){
   let img = await fetch('http://localhost:8080/images/'+resp.cover);
   let img_cover = await fetch('http://localhost:8080/images/'+re[re.length - 1].cover)
   let reimg = await img.text();
   let recover = await img_cover.text();
   let div = document.querySelector('.box');
   let newdiv = document.createElement('div');
   newdiv.setAttribute('class','recent');
   newdiv.setAttribute('onclick',`myff('${reimg}','${resp.title}','${resp.artist}','${resp.location}')`);
   newdiv.innerHTML = `<img src="${reimg}"><p>${resp.title}</p><span>${resp.artist}</span>`
  // div.insertBefore(newdiv,document.querySelector('view-more'));
   div.insertAdjacentElement( 'afterbegin', newdiv);
   let file = `${re[re.length - 1].location}`;
   var audio = new Audio('/music/'+file);
   document.querySelector('.song').innerHTML = `${re[re.length -  1].title}`;
   document.querySelector('.title-cover').innerHTML = `${re[re.length -  1].artist}`;
   document.querySelector('.img-cover').src = `${recover}`;
 
myff = (a,b,c,d) =>{
    let x;
    if([a,b,c,d] == undefined){
      audio = audio;
      clearInterval(x)
    }
    else{
      audio = new Audio('/music/'+d);
      clearInterval(x)
    }
    x = () => {
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
  }
  setInterval(x,1000)
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
   }
   }
   catch(err){
     alert(err)
  }
}
