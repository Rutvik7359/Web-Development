var chatPopup = document.getElementById('chatPopup');
var button = document.getElementById('button');

button.onclick = function(){
  if(popup.style.visibility=='visible')
      popup.style.visibility='hidden';
  else
      popup.style.visibility='visible';
}

function output(e){
  if(e.keyCode == 13){
    var messageField = document.getElementById('messageField').value;
    document.getElementById('output').innerHTML += "You: " + messageField + "<br>";
    document.getElementById('messageField').value = '';
    return false;
  }
}
