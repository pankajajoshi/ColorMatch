const colors = ["red", "blue", "green", "yellow"];
let oneBlockClicked = null;
let otherBlockClicked = null;
let score = 0;
const scoreBoard = document.getElementById("score");
const endGameModal = document.getElementById("endGameModal");
const endGameModalTitle = document.getElementById("endGameModalTitle");
function createBlocks() {
  const gridBox = document.getElementById("grid-box");
  if (!gridBox) {
    console.error("Cannot find element with ID 'grid-box'");
    return;
  }

  for (let i = 0; i < 30; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const block = document.createElement("div");
    block.classList.add("block", randomColor, "falling");
    block.addEventListener("click", () => {
      if (!oneBlockClicked) {
        oneBlockClicked = block;
        block.style.opacity = "0.35";
        let blockSound = new Audio("Menu_Select_01.wav");
        blockSound.play();
      } else if (!otherBlockClicked && oneBlockClicked !== block) {
        otherBlockClicked = block;
        block.style.opacity = "0.35";
        if (oneBlockClicked.classList[1] === otherBlockClicked.classList[1]) {
          const blocksToRemove = document.querySelectorAll(
            `.block.${oneBlockClicked.classList[1]}`
          );
          blocksToRemove.forEach((blockToRemove) => {
            blockToRemove.remove();
            score += 100;
          });
          oneBlockClicked = null;
          otherBlockClicked = null;
          scoreBoard.textContent = `Score: ${score}`;
          checkWinner();
        } else {
          setTimeout(() => {
            oneBlockClicked.style.opacity = "1";
            otherBlockClicked.style.opacity = "1";
            oneBlockClicked = null;
            otherBlockClicked = null;
          }, 250);
        }
      }
    });
    gridBox.appendChild(block);
  }

  const updateScore = () => {
    scoreBoard.textContent = `Score: ${score}`;
    scoreBoard.style.color = "rgb(14, 52, 164)";
    scoreBoard.style.fontSize = "24px";
    scoreBoard.style.textAlign = "center";
    
  };

  const checkWinner = () => {
    if (document.querySelectorAll(".block").length === 0) {
      openEndGameModal();
      displayEndGameMessage();
      updateScore();
    }
  };

  const openEndGameModal = () => {
    endGameModal.classList.add("active");
  };

  const displayEndGameMessage = () => {
    let winnerSound = new Audio("Jingle_Win_00.wav");
    winnerSound.play();
    if (document.querySelectorAll(".block").length === 0) {
      endGameModalTitle.textContent = `You've cleared all Blocks! You Win !! Your Score : ${score}`;
      //endGameModalTitle.innerHTML = `You've cleared all Blocks! <span style="font-size: 24px; font-weight: bold;">You Win !</span> Your Score: ${score}`;
      endGameModalTitle.style.color = "rgb(14, 52, 164)";
      endGameModalTitle.style.fontSize = "24px";
      endGameModalTitle.style.textAlign = "center";
    } else {
      endGameModalTitle.textContent = `Keep Breaking and earn your Score `;
      endGameModalTitle.style.color = "rgb(14, 52, 164)";
      endGameModalTitle.style.fontSize = "24px";
      endGameModalTitle.style.textAlign = "center";
    }
  };
  //addRestartListener();
}

createBlocks();
