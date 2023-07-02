const colors = ["red", "blue", "green", "yellow", "purple"];// Just basic colors stated 
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
  const checkWinner = () => {
    console.log('score is: ', score);
    if(score >= 1500) { 
        console.log('score is >=1500 ', score);
   // if (document.querySelectorAll(".block").length === 0) {
      openEndGameModal();
      displayEndGameMessage();
      //updateScore();
    }
  };
  
  const openEndGameModal = () => {
    console.log('openEndGameModal');
    endGameModal.classList.add("active");
  };

  const displayEndGameMessage = () => {
    console.log('displayEndGameMessage');
    let winnerSound = new Audio("WinnerMusic.wav");
    winnerSound.play();
    if (document.querySelectorAll(".block").length === 0) {
      endGameModalTitle.textContent = `You've cleared all Blocks! You Win !! Your Score : ${score}`;
      //endGameModalTitle.innerHTML = `You've cleared all Blocks! <span style="font-size: 24px; font-weight: bold;">You Win !</span> Your Score: ${score}`;
      endGameModalTitle.style.color = "rgb(14, 52, 164)";
      endGameModalTitle.style.fontSize = "24px";
      endGameModalTitle.style.textAlign = "center";
    } else if(score >= 1500) {
      endGameModalTitle.textContent = `Awesome! you earned 1500 or more points, on to next level!! `;
      endGameModalTitle.style.color = "rgb(14, 52, 164)";
      endGameModalTitle.style.fontSize = "24px";
      endGameModalTitle.style.textAlign = "center";
    }
  };


const m = 5;
const  n = 5; 
let box = [];
for (var i = 0; i < m; i++) {
  box[i] = [];
}

let blocksToFill=0;

function createBlocksInGrid(){
    for (var x = 0; x < m; x++) {
        box.push([]);
        for (var y = 0; y < n; y++) {
          box[x].push(getRandomColor());
        }
      }
      renderBlocks(true);
      clearFallingClass();
}

function renderBlocks(firstTime) {
    const gridBox = document.getElementById("grid-box");
    gridBox.innerHTML='';
    for(var x=0;x<m;x++){
        for(var y=0;y<n;y++){
            const block = document.createElement("div");
            block.id=x+"_"+y;
            block.classList.add("block", box[x][y]/*, "falling"*/); // block yellow falling
            if(firstTime) block.classList.add("falling");
            // add click event event listener with following data for future removal
            block.color=box[x][y];
            block.row=x;
            block.col=y;
            block.addEventListener("click", blockClicked);

            // append the block to grid
            gridBox.appendChild(block);
        }
    }
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

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

function slideBlocks1() {
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
       // topEle.classList.remove("shaking");
      //  el.classList.remove("shaking");
    }
   });
   clearShakingClass();
}

function slideBlocks() {
console.log('blocks to fill ', blocksToFill);

while (blocksToFill > 0) {
    for (var x = 0; x < m; x++) {
      for (var y = 0; y < n - 1; y++) {
        // check below for a hole
        if (box[y][x]!= 'white' && box[y + 1][x] == 'white') {
          var itemsToShiftDown = [];
          var idx = y;
          while (idx >= 0 && box[idx][x]) {
            // move up the column, adding colors to array
            var color = box[idx][x];
            itemsToShiftDown.push(color);
            box[idx][x] = 'white';
            idx--;
          }
          // start at the hole
          idx = y + 1;
          // move back up the column, assigning colors to the open spaces
          for (var i = 0; i < itemsToShiftDown.length; i++) {
            box[idx][x] = itemsToShiftDown[i];
            idx--;
          }
          
        }
      }
    }
    blocksToFill--;
  }
}

function removeShakingBlocks() {
    var elems = document.querySelectorAll(".shaking");
    console.log('removeShakingBlocks ', elems, elems.length);
    let count = 0;
    [].forEach.call(elems, function (el) {
        //el.className='';
       // el.classList.add("white");
       // el.color='white';
        box[el.row][el.col]='white';
        blocksToFill++;
        count++;
    });
 

    slideBlocks();
    renderBlocks(false);
    score += count*100;
    updateScore();
    checkWinner();
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
    if(arr.length >1)
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

 



  //addRestartListener();
}

createBlocksInGrid();
