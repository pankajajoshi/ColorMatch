const colors = ["red", "blue", "green", "yellow"];// Just basic colors stated 
let oneBlockClicked = null;// Keeps track of first block clicked, its null because no block was clicked.It has to be let because it will changed.
let otherBlockClicked = null;//Keeps track of second block clicked, its null because no block was clicked. It has to be let because it will changed.
let score = 0;//intializing and creating  score to 0
const scoreBoard = document.getElementById("score");//creating scoreBoard obect to hold id Score(html element by it id)
const endGameModal = document.getElementById("endGameModal");//creating endGameModal obect to hold value of endGameModal html element by it's id
const endGameModalTitle = document.getElementById("endGameModalTitle");//creating endGameModalTitle to hold id of endGameModalTitle
//creating create blocks
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
        let blockSound = new Audio("blockcrush.wav");
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
    let winnerSound = new Audio("WinnerMusic.wav");
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
