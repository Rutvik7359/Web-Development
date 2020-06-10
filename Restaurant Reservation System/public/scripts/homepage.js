$(document).ready(function() {
	$('#chat').hide();
	$("#chat-box").hide();
	$("#contact-us-block-button").click(function() { toggleHidden() }); // show/hide chat when contact-us is pressed
	$("#chat-send-button").click(function() {sendButtonPressed()}); // sends message to server when the send button is pressed
	$("#chat-box").find("input").keypress(function(event) { enterPressed(event) }); // sends message when enter is preswsed 
	$("#chat-banner").click(function(){toggleHiddenActiveChat()}); // Hides chat but shows banner when the banner is clicked
	$("#chat-banner").find(".closeBtn").click(function() { toggleHidden() }); // Hides chat when the user presses the close button
});
//socket.emit('send message', "Hello From Client");

// Function that toggles the chat from hidden to visible when the contact us button is clicked
function toggleHidden() {
  if ($("#chat").is(":hidden")) {
    $("#chat-box").show();
	 	$("#chat").show();
  }
  else {
    $("#chat-box").hide();
		$("#chat").hide();
  }
}

// Function that keeps the chat header visible when clicked to be hidden
function toggleHiddenActiveChat() {
	if($("#chat-box").is(":hidden")) {
		$("#chat-box").show();
	}
	else {
		$("#chat-box").hide();
	}
}

// Function that takes the message and sends it to the sever when the entey key is pressed 
async function enterPressed(event) {
  var textbox = $("#chat-box").find("input");
  if (event.key === "Enter" && textbox.val() != "") {
	 	var chatTime = systemTime();
    var textContent = textbox.val();
		var textbubble = $(`<div class="text" id="client-message">${textContent}</div>`);
		$("#chat-area").append(textbubble);
	 	$("#chat-area").append(`<div class="time" id="client-time">${chatTime}</div>`);

		// If the text is longer than the specified amount, use CSS that wraps the text around
		console.log(getTextWidth(textContent, "bold 12pt arial"));
		if (getTextWidth(textContent, "bold 12pt arial") > 247) {
			await changeTextBubble(textbubble, "textwrap");
		}

	 	// Send chat message to the server
	 	socket.emit('send message', textContent);
    textbox.val("");
	 	recieveMessage();
	 	// Auto scrolling to the bottom when something is entered
	 	var chatArea = document.getElementById("chat-area");
		chatArea.scrollTop = chatArea.scrollHeight;
  }
}

// This function helps change the chat bubble's CSS class based on how long the message is.
// It must return a promise, otherwise the DOM will not update.
function changeTextBubble(div, className) {
  return new Promise(resolve => {
    setTimeout(() => {
			resolve('resolved');
			div.attr("class", className);
    }, 1);
  });
}

// Function to get width of text 
// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text, font) {
	// re-use canvas object for better performance
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
}

// Function that sends the information to the sever when the send button is clicked
function sendButtonPressed(){
	var textContent = $("#message-input").val();
	var chatTime = systemTime();
	//var textContent = textbox.val();
	console.log(textContent);
	$("#chat-area").append(`<div class="text" id="client-message">${textContent}</div>`);
	$("#chat-area").append(`<div class="time" id="client-time">${chatTime}</div>`);
	// Send chat message to the server
	socket.emit('send message', textContent);
	// Reset message box 
	$("#message-input").val("");
	recieveMessage();
	// auto scrolling to the bottom when something is entered
	var chatArea = document.getElementById("chat-area");
	chatArea.scrollTop = chatArea.scrollHeight;

}


// Function to recieve message from the servver
function recieveMessage() {
	socket.on('send message', function(data) {
		console.log(data);
		$("#chat-area").append(`<div class="text" id="server-message">${data.serverMessage}</div>`);
		$("#chat-area").append(`<div class="time" id="server-time">${data.serverTime}</div>`);
		$("#chat-area").append(`<div class="spacer"> </div>`);
		document.title = "New Message";
		var chatArea = document.getElementById("chat-area");
		chatArea.scrollTop = chatArea.scrollHeight;
	});
}

// Function to get the system time when entering a message
function systemTime() {
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	// Format the minutes so they give a leading 0 if less than 10
	if (minutes < 10) {
		var time = `${hours}:0${minutes}`;
	}
	else {
		var time = `${hours}:${minutes}`;
	}
	return time;
}

