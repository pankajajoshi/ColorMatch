// start game modal initializations
const startBtn = document.getElementById("startBtn");

// add intro message one character at a time, to simulate typing
const typeText = (div, message, len) => {
  if (len > message.length) return;
  div.innerText = message.substr(0, len);
  setTimeout(function () {
    typeText(div, message, len + 1);
  }, 35);
};

// start screen and writer
let div = document.createElement("div");
let welcomeContainer = document.getElementById("gameMessage");
let inputname=document.getElementById("inputname");

welcomeContainer.appendChild(div);
typeText(
  div,
  `Welcome Player !!\n\nTo Play this COLOR MATCH GAME ,Match the Same Color Blocks \n\nClear Blocks and  HAVE FUN!!`,
50
);
//play Game
startBtn.addEventListener("click", () => {
  // redirect to game.html
  window.location.href = "html/game.html?level=level1&name="+inputname.value;
});
