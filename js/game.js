const colors = ["red", "blue", "green", "yellow", "pink"];// Just basic colors stated 
let oneBlockClicked = null;// Keeps track of first block clicked, its null because no block was clicked.It has to be let because it will changed.
let otherBlockClicked = null;//Keeps track of second block clicked, its null because no block was clicked. It has to be let because it will changed.
let score = 0;//intializing and creating  score to 0
const scoreBoard = document.getElementById("score");//creating scoreBoard obect to hold id Score(html element by it id)
const endGameModal = document.getElementById("endGameModal");//creating endGameModal obect to hold value of endGameModal html element by it's id
const endGameModalTitle = document.getElementById("endGameModalTitle");//creating endGameModalTitle to hold id of endGameModalTitle
const updateScore = () => {
    scoreBoard.textContent = `Score: ${score}`;
    scoreBoard.style.color = "rgb(14, 52, 164)";
    scoreBoard.style.fontSize = "24px";
    scoreBoard.style.textAlign = "center";
    
  };

const m = 5;
const  n = 5; 
let box = [];
for (var i = 0; i < m; i++) {
  box[i] = [];
}

function createBlocksInGrid(){
    const gridBox = document.getElementById("grid-box");
    if (!gridBox) {
      console.error("Cannot find element with ID 'grid-box'");
      return;
    }

    for (let i = 0;i < m; i++){
        for(let j = 0;j < n; j++){
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            box[i][j]=randomColor;
            const block = document.createElement("div");
            block.id=i+"_"+j;
            block.classList.add("block", randomColor, "falling"); // block yellow falling
            // add click event event listener with following data for future removal
            block.color=randomColor;
            block.row=i;
            block.col=j;
            block.addEventListener("click", blockClicked);

            // append the block to grid
            gridBox.appendChild(block);
        }
    }
console.log(gridBox);
console.log(box);
clearFallingClass();
} // end create blocks in array

function blockClicked(eventObj) {
    eventObj.preventDefault();
    console.log('block clicked', eventObj.currentTarget.color, eventObj.currentTarget.row, eventObj.currentTarget.col);
    // if the blocks already have shaking, click on it should remove those blocks
    removeShakingBlocks();
    let sameColorNeighbors=[];
    populateSameColorNeighbors(eventObj.currentTarget.color, eventObj.currentTarget.row, eventObj.currentTarget.col, sameColorNeighbors);
    console.log(sameColorNeighbors);
    assignShakeStyleToBoxes(eventObj.currentTarget.color, sameColorNeighbors);
}

function slideBlocks() {
   // switch bottom white blocks with top colored blocks -- use columns only, rows remain as is
   var elems = document.querySelectorAll(".white");
   console.log(elems, elems.length);
   [].forEach.call(elems, function (el) {
    let currCoords = el.id.split("_"); // id="0_0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    r=r-1;
    if(r>-1){
        console.log(r+"_"+c);
        let topEle = document.getElementById(r+"_"+c);
        console.log(topEle);
        let temp = topEle.className;
        topEle.className=el.className;
        el.className = temp;
        // remove shaking
        topEle.classList.remove("shaking");
        el.classList.remove("shaking");
    }
   });

}


function removeShakingBlocks() {
    var elems = document.querySelectorAll(".shaking");
    console.log('removeShakingBlocks ', elems, elems.length);
    let count = 0;
    [].forEach.call(elems, function (el) {
        el.className='';
        el.classList.add("white");
        count++;
    });
    slideBlocks();
    score += count*100;
    updateScore();
}

function clearFallingClass(){
    clearClass("falling");
}

function assignShakeStyleToBoxes(color, arr){
    // remove all shaking class
    clearShakingClass();
    // add shaking
    addShakingClassToSelectedElements(arr, color);

}

function addShakingClassToSelectedElements(arr, color) {
    for (let i = 0; i < arr.length; i++) {
        console.log(color + "_" + arr[i][0] + '_' + arr[i][1]);
        let ele = document.getElementById( arr[i][0] + '_' + arr[i][1]);
        if(ele.className != 'white') {
            ele.classList.add("shaking");
        }
    }
}

function clearShakingClass() {
    clearClass('shaking');
}

function clearClass(className) {
    var elems = document.querySelectorAll("."+className);

    [].forEach.call(elems, function (el) {
        el.classList.remove(className);
    });
}

function populateSameColorNeighbors(color, row, col, arr) {
    console.log('box[row][col]', box[row][col], ' finding color: ', color, ' found at loc: ', row, col);
    if(row>=5 || col>=5 || row<0 || col<0) return false;
    if(box[row][col] != color){
        console.log('no matching color ', color, 'at location: ', row, col);
       return false;
    }
    arr.push([row, col]);
    
    populateSameColorNeighbors(color, row+1, col, arr);
    populateSameColorNeighbors(color, row, col+1, arr);
    //populateSameColorNeighbors(color, row-1, col, arr);
   // populateSameColorNeighbors(color, row, col-1, arr);
}

//creating create blocks
function createBlocks() {
  const gridBox = document.getElementById("grid-box");
  if (!gridBox) {
    console.error("Cannot find element with ID 'grid-box'");
    return;
  }

  createBlocksInGrid();

  for (let i = 0; i < 30; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const block = document.createElement("div");
    block.classList.add("block", randomColor, "falling"); // block yellow falling
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
            console.log(blockToRemove);
           // blockToRemove.remove();
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
   // gridBox.appendChild(block);
  }

 
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
