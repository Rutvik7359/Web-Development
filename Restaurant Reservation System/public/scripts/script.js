$(document).ready(function() {
  $("#chat-button").click(function() { toggleHidden() });
  $("#chat-box").find("input").keypress(function(event) { enterPressed(event) });
});

function toggleHidden() {
  if ($("#chat-box").is(":hidden")) {
    $("#chat-box").show();
  }
  else {
    $("#chat-box").hide();
  }
}

function enterPressed(event) {
  var textbox = $("#chat-box").find("input");
  if (event.key === "Enter" && textbox.val() != "") {
    var textContent = "You: " + textbox.val();
    $("#chat-area").append(`<div class="text">${textContent}</div>`);
    textbox.val("");
  }
}