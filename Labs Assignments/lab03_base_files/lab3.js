var chatPopup = document.getElementById('chatPopup');
var button = document.getElementById('button');

button.onclick = function(){
  if(chatPopup.style.visibility=='visible')
      chatPopup.style.visibility='hidden';
  else
      chatPopup.style.visibility='visible';
}

function output(e){
  if(e.keyCode == 13){
    var message = document.getElementById('message').value;
    document.getElementById('output').innerHTML += "You: " + message + "<br>";
    document.getElementById('message').value = '';
    return false;
  }
}
