/*let name = document.querySelectorAll	('.name')[0];
let mail = document.querySelectorAll('.name')[1];
let password1 = document.querySelectorAll('.name')[2];
let password2 = document.querySelectorAll('.name')[3];*/

let port = window.location.origin;
document.querySelectorAll('.name')[0].oninput = function(){
//  check(this.value);
  check(`${this.value}`)
}
document.querySelectorAll('.name')[1].oninput = function(){
  checkmail(`${this.value}`)
} 
async function check(nme){
  let dat = await fetch(`${port}/check?data=${nme}`);
  let dta = await dat.text();
  if(dta == '[]'){
    document.getElementById('text').innerHTML = 'Username Available';
    document.getElementById('text').style.color = 'green';
    document.querySelector('.btn').removeAttribute('disabled')
  }
  else{
    document.getElementById('text').innerHTML = 'Username unavailable';
    document.getElementById('text').style.color = 'red';
    document.querySelector('.btn').setAttribute('disabled','disabled')
    
  }
}
async function checkmail(nme){
  let dat = await fetch(`${port}/mail?mail=${nme}`);
  let dta = await dat.text();
  if(dta == '[]'){
    document.getElementById('mail').innerHTML = '';
    document.getElementById('mail').style.color = 'green';
    document.querySelector('.btn').removeAttribute('disabled')
  }
  else{
    document.getElementById('mail').innerHTML = 'Use a unique mail or enter a valid mail';
    document.getElementById('mail').style.color = 'red';
    document.querySelector('.btn').setAttribute('disabled','disabled')
  }
}
function validate(){
let name = document.querySelectorAll('.name')[0];
let mail = document.querySelectorAll('.name')[1];
let password1 = document.querySelectorAll('.name')[2];
let password2 = document.querySelectorAll('.name')[3];
if(name.value.length <= 4){
  alert('Name too short');
}
 else if(mail.value.indexOf('@') == -1 || mail.value.indexOf('.') == -1){
  alert('Enter a valid mail')
}
 else if (password1.value <= 6) {
  alert('Password length is less than 6')
}
 else if (password1.value.includes('1') == false && password1.value.includes('2') == false && password1.value.includes('3') == false && password1.value.includes('4') == false && password1.value.includes('5') == false && password1.value.includes('6') == false && password1.value.includes('7') == false && password1.value.includes('8') == false && password1.value.includes('9') == false && password1.value.includes('0') == false) {
  alert('Password must have at least one number')
}
 else if(password1.value != password2.value){
  alert('Password does not match')
}
else {
  document.querySelector('.btn').setAttribute('type','submit')
}
}
