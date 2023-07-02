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
    } else {
        console.log('score is less than 1500, next check if user can play further');
        //check if any same blocks are remaining, if not show game over
        if(!areThereAnyMatchingBlocks()) {
           openEndGameModal();
           displayEndGameMessage();
        }
    }
  };
  
  const openEndGameModal = () => {
    console.log('openEndGameModal');
    endGameModal.classList.add("active");
  };

  const displayEndGameMessage = () => {
    console.log('displayEndGameMessage');
    let winnerSound = new Audio("../winsound.wav");
    winnerSound.volume=0.2;
    winnerSound.play();
    
    if (document.querySelectorAll(".block").length === 0) {
      endGameModalTitle.textContent = `You've cleared all Blocks! You Win !! Your Score : ${score}`;
    } else if(score >= 1500) {
        
      endGameModalTitle.textContent = `Awesome! you earned 1500 or more points, on to next level!! `;
     
    } else {
        // this no more matches available to play further, end the game
        endGameModalTitle.textContent = `There are no matching blocks! Game over! `;
    }
    endGameModalTitle.style.color = "rgb(14, 52, 164)";
    endGameModalTitle.style.fontSize = "24px";
    endGameModalTitle.style.textAlign = "center";
  };


const m = 5;
const  n = 5; 
let box = [];
for (var i = 0; i < m; i++) {
  box[i] = [];
}

let blocksToFill=0;

function areThereAnyMatchingBlocks() {

    var doesAnyRowHaveMatchingBlocks = false;
    for(var x=0;x<m-1;x++){
        for(var col=0;col<n;col++){
            //console.log('x:', x, 'col:', col, ' box[x][col]:', box[x][col], ' box[x+1][col]: ', box[x+1][col]);
            if( (box[x][col] == box[x+1][col]) &&  box[x][col] != 'white') {
                doesAnyRowHaveMatchingBlocks = true;
                break;
            }
        }
    }

    var doesAnyColumnHaveMatchingBlocks = false;
    for(var y=0;y<n-1;y++){
        for(var row=0;row<n;row++){
           // console.log('y:', y, 'row:', row, ' box[row][y]:', box[row][y], ' box[row][y+1]: ', box[row][y+1]);
            if( (box[row][y] == box[row][y+1]) &&  box[row][y] != 'white') {
                doesAnyColumnHaveMatchingBlocks = true;
                break;
            }
        }
    }

   console.log('doesAnyRowHaveMatchingBlocks: ', doesAnyRowHaveMatchingBlocks);
   console.log('doesAnyColumnHaveMatchingBlocks: ', doesAnyColumnHaveMatchingBlocks);

    return doesAnyRowHaveMatchingBlocks || doesAnyColumnHaveMatchingBlocks;
}
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
    let blockCrush=new Audio("../blockmatchsound.wav");
    blockCrush.volume=0.2;
    blockCrush.play();
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
        let blockCrush=new Audio("../matchbreak.wav");
    blockCrush.volume=0.2;
    blockCrush.play();
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
    // check if arr already has the x,y coordinates, do not visit again.
    if(arr.length >0) {
        for (let i = 0; i < arr.length; i++) {
            console.log( arr[i][0] + '_' + arr[i][1]);
            if(arr[i][0] == row && arr[i][1] == col){
                return;
            }
        }
    }

    if(row>=5 || col>=5 || row<0 || col<0) return;
    if(box[row][col] != color){
        console.log('no matching color ', color, 'at location: ', row, col);
       return;
    }
    console.log('box[row][col]', box[row][col], ' finding color: ', color, ' found at loc: ', row, col);

   // add the matching neighbor to array.
    arr.push([row, col]);

   populateSameColorNeighbors(color, row+1, col, arr );
   populateSameColorNeighbors(color, row, col+1, arr);
   populateSameColorNeighbors(color, row-1, col, arr);
   populateSameColorNeighbors(color, row, col-1, arr);

}
createBlocksInGrid();
