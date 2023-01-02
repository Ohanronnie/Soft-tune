class GetData{
  constructor(){
  this.response;
  this.port = window.location.origin;
  this.name = document.querySelector('.content .username');
  this.intro = document.querySelector('.content .bio');
  //this._name_ = document.querySelectorAll('.outline')[0];
  //this._pass_ = document.querySelectorAll('.outline')[1];
//  this.bio = document.querySelectorAll('.outline')[2];
  this.fetchdata();
//  this.name.oninput = this.checkPass()
  }
  async fetchdata(){
   this.result = await fetch(this.port + '/profileDetails');
   this.response = await this.result.json();
   this.name.value = this.response[0].username;
   this.intro.value = this.response[0].userdata.description;
 }
  checkName(){
   if(this.name.value.length < 4){
     this.name.textContent = "username too short";
     this.name.style = 'color: red';
   }
   else{
     this._name_.textContent = ""
    }
  }
  checkPass(){
   if(this.name.value.length < 4){
     this.name.textContent = "username too short";
     this.name.style = 'outline:1px solid red';
   }
   else{
     this.name.textContent = ""
    } 
  }
}
let data = new GetData();
//let port = "http://localhost:8080";
let name = document.querySelector('.content .username');
name.setAttribute('oninput','checkPass()')
function checkPass(){
  name_trim =  name.value.trim();
   if(name_trim.length < 4){
  //   name.textContent = "username too short";
     name.style = 'outline:1px solid red'; 
     document.querySelector('input[type="submit"]').setAttribute('disabled','disabled');
   }
   else{
//     name.textContent = "";
     name.style = 'outline: none'; 
     document.querySelector('input[type="submit"]').removeAttribute('disabled');
   }
}
function validate(){
  let pass = document.querySelector('.password').value;
  fetch(`${window.location.origin}/checkPass?pass=${pass}`)
  .then(response => response.json())
  .then(res => {
  if(res.length == 0){
    alert('incorrect password');
    window.location = '/update';
    return false;
  }
  else{
   return true
  }
})
}
