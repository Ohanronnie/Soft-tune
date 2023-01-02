
class GetData{
  constructor(){
  this.port = window.location.origin;
  this.response;
  this.name = document.querySelector('.content h3');
  this.intro = document.querySelector('.content .intro p');
  this.subscribers = document.querySelector('.content ul li i[class="fa fa-wifi rotate"] ~ span');
  this.musicadded = document.querySelector('.content ul li i[class="fa fa-plus"] ~ span');
  this.img = document.querySelector('.content img')
  this.fetchdata();
  }
  async fetchdata(){
   this.result = await fetch(this.port + '/profileDetails');
   this.response = await this.result.json();
   this.name.textContent = this.response[0].userdata.name;
   this.intro.textContent = this.response[0].userdata.description;
   this.subscribers.textContent = `Followed by ${this.response[0].userdata.subscriber} people`
   this.musicadded.textContent = `${this.response[0].userdata.musicAdded} music added`
   this.img.src = this.response[0].userdata.coverPath;
 }
}
function upload(e){
      let file = e.files[0];
      let reader = new FileReader();
      reader.onloadend = function(){
        document.querySelector('#img').src= reader.result
      }
      reader.readAsDataURL(file)
      document.getElementById('submit').click();
    
}
let data = new GetData();
