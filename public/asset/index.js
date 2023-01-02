'use strict';
const PORT = window.location.origin;
function setStreams(x) {
  const src = x.getAttribute('data-src');
  fetch(`${PORT}/stream?position=${src}`);
}
const musicList = [];
function setToLastPlayed(x) {
  const src = x.getAttribute('data-src');
  fetch(`${PORT}/lastPlayed?location=${src}`);
}
async function getTrending() {
  const response_trending = await fetch(`${PORT}/trending?t=${Math.random() * 9E7}`);
  const each_res = await response_trending.json();
  const resp_index = await fetch(`${PORT}/musicList`);
  const data = await resp_index.json();
  console.log(each_res);
  for(const musics of each_res) {
    const div = document.querySelector('.div .box-content');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'footer display');
    newDiv.setAttribute('data-src', `${musics.cover}`);
    console.log(each_res.indexOf(musics));
    let xyz = '';
/*    newDiv.setAttribute('onclick', `setToLastPlayed(this); setStreams(this); loadTrack(${data.indexOf(data.find((value) => value.cover === musics.cover))})`);*/
    fetch(`${PORT}/images/${musics.cover}`)
    .then(response => response.text())
	.then(resp_img => {
    //const resp_img = await deta.text();
    /*newDiv.innerHTML = `
		    <img src="${resp_img}" style="border-radius: 1.2vw" class="img-cover">
    `*/
    newDiv.innerHTML += `		    
		    <img src="${resp_img}" style="border-radius: 1.2vw" class="img-cover">
			<ul data-src="${musics.cover}" onclick="setToLastPlayed(this); setStreams(this); loadTrack(${data.indexOf(data.find((value) => value.cover === musics.cover))})">
			   <li class="song">${musics.title}</li>
               <li class="title-cover">${musics.album}</li>
           </ul>
		    <i class="fa fa-ellipsis-v tooltip" id="play"> <ul class="tooltiptext">
				<li>Play</li>
				<li>Add to playlist</li>
		    </ul></i>
		`;
		});
    div.appendChild(newDiv);
  };
}
getTrending();
async function lastplayed() {
  const respo = await fetch(`${PORT}/lastPlayedList`);
  const respon_list = await respo.json();
  const respon = [];
  for (const i of respon_list) {
    if (respon.indexOf(respon.find((value) => value.cover === i.cover)) == -1) {
      respon.push(i);
    }
  }
  console.log(respon)
  // let respon = [...new Map(respon_all.map((item) => [item["id"], item])).values()];
  // let respon = [...new Set(respon_all)];
  const response = await fetch(`${PORT}/musicList`);
  const music_list = await response.json();
  /* let req = JSON.parse(re);
   alert(req)
   */for (const rest of respon) {
    const img = await fetch(`${PORT}/images/${rest.cover}`);
    const img_cover = await fetch(`${PORT}/images/${respon[respon.length - 1].cover}`);
    const reimg = await img.text();
    const recover = await img_cover.text();
    const div = document.querySelector('.box');
    const newdiv = document.createElement('div');
    newdiv.setAttribute('class', 'recent');
    newdiv.setAttribute('data-src', `${rest.cover}`);
    newdiv.setAttribute('onclick', `setStreams(this);loadTrack('${music_list.indexOf(music_list.find((value) => value.cover === rest.cover))}')`);
    newdiv.innerHTML = `<img src="${reimg}"><p>${rest.title}</p><span>${rest.album}</span>`;
    // div.insertBefore(newdiv,document.querySelector('view-more'));
    div.insertAdjacentElement('afterbegin', newdiv);
    const file = `${respon[respon.length - 1].location}`;
    const audio = new Audio(`/music/${file}`);
    /*document.querySelector('.song').innerHTML = `${respon[respon.length - 1].title}`;
    document.querySelector('.title-cover').innerHTML = `${respon[respon.length - 1].album}`;
    document.querySelector('.img-cover').src = `${recover}`;*/
  }
  document.body.setAttribute('class', 'aria');
}
async function getCaster(){
	const data = await fetch(`${PORT}/topcaster`,{
		method: 'POST'
	});
	function verified(k){
	//	k ? return '<i class="fa fa-check-circle"></i>' : return '&nbsp;'
		if(k){
			return '<i class="fa fa-check-circle"></i>'
		}
		else{
			return '&nbsp'
		}
	}
	const topCaster = await data.json();
	const elem = document.querySelector('.div .main');
	for(let i of topCaster){
		let div = document.createElement('div');
		div.innerHTML = `
			   <img src="${i.userdata.coverPath}">
			   ${verified(i.userdata.verified)}
      	       <ul>
 	           <li class="name">${i.userdata.name}</li>
  	           <li>${i.userdata.subscriber} followers</li>
      	       </ul>
		`
		elem.appendChild(div)
	}
}
getCaster();
lastplayed();
