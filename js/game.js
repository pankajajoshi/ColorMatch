const colors = ["red", "blue", "green", "yellow", "purple"];// Just basic colors stated 
let score = 0;//intializing and creating  score to 0
const scoreBoard = document.getElementById("score");//creating scoreBoard obect to hold id Score(html element by it id)
const levelBoard = document.getElementById('level');
const endGameModal = document.getElementById("endGameModal");//creating endGameModal obect to hold value of endGameModal html element by it's id
const endGameModalTitle = document.getElementById("endGameModalTitle");//creating endGameModalTitle to hold id of endGameModalTitle
const welcomeMsg =document.getElementById("welcomeBoard");//display message
const gameParams = new URLSearchParams(document.location.search);//URLSearchParams interface defines utility methods to work with the query string of a URL.Returns a URLSearchParams object instance.
var level = gameParams.get('level') || 'level1';
var playerName=gameParams.get('name') || 'player';//index.html parameters from url passed from index.js

/*Update function will update score when the tiles are removed*/
const updateScore = () => {
    scoreBoard.textContent = `Score: ${score}`;
    
  };

  /*Check winner function is called when score matches for the winner score and it calls for the end modal game to display winner message accordingly*/
  const checkWinner = () => {
    console.log('score is: ', score);
    if(score >= 3000) { 
        console.log('score is >=3000 ', score);
   
      openEndGameModal();
      displayEndGameMessage();
      
    } else {
        console.log('score is less than 3000, next check if user can play further');
        //check if any same blocks are remaining, if not show game over
        if(!areThereAnyMatchingBlocks()) {
           openEndGameModal();
           displayEndGameMessage();
        }
    }
  };
  
  /* opendendgamemodal will show the endGameModal popup -once this is active we can not click on grid */
    const openEndGameModal = () => {
        console.log('openEndGameModal');
        endGameModal.classList.add("active");
        const gridBox = document.getElementById("grid-box");
        gridBox.style.opacity=".4";
        //  This works in IE 8 & 9 too 
        //  ... but also 5, 6, 7 
        // gridBox.style.filter="alpha(opacity = 50)";
        gridBox.style.filter="blur(4px)";
     };

    /*Display Endgame modal ,will diplay end message accordingly */
  const displayEndGameMessage = () => {
    console.log('displayEndGameMessage');
    
    var nextLvlButton = document.getElementById('nextLvlLink');
    if (document.querySelectorAll(".block").length === 0) {
      endGameModalTitle.textContent = `You've cleared all Blocks! You Win !! Your Score : ${score}`;
    } else if(score >= 3000) {
       
        //var resetGameBtn = document.getElementById("resetGameBtn");
        if(level == 'pro') {
            nextLvlButton.style.display='none';
            endGameModalTitle.textContent = `You Win !! Your Score : ${score}`;
           
          }else {
            endGameModalTitle.textContent = `Awesome! you earned it! Now, on to next level!! `;
          }
      if(level == 'level1'){
        level='level2';
      } else if(level== 'level2'){
        level = 'pro';
      }
      
      nextLvlButton.href = 'game.html?level='+level+'&name='+playerName;
    //   if(!resetGameBtn.href.contains('&name')){
    //     resetGameBtn.href = resetGameBtn.href+'&name='+playerName;
    //   }
    } else {
        // this no more matches available to play further, end the game
        endGameModalTitle.textContent = `There are no matching blocks! Game over! `;
        nextLvlButton.style.display='none';
    }
    let winnerSound = new Audio("../winsound.wav");
    winnerSound.volume=0.2;
    winnerSound.play();
    endGameModalTitle.style.color = "rgb(14, 52, 164)";
    endGameModalTitle.style.fontSize = "24px";
    endGameModalTitle.style.textAlign = "center";
  
    
  };


const m = 7;
const  n = 7; 
let box = [];
for (var i = 0; i < m; i++) {
  box[i] = [];
}

let blocksToFill=0;

/*checks if the adjecent neighbour tile has same color using 2d array once with row and column returns true if either is true */

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

/* Create blocks in grid in rows and columns by pushing in the girdbox with random colors */
function createBlocksInGrid(){
    welcomeMsg.textContent='Welcome, '+playerName +'!!!';
   
    if(level == 'level1'){
        levelBoard.textContent = 'Level 1' ;
    } else if(level == 'level2') {
        levelBoard.textContent = 'Level 2' ;
    } else {
        levelBoard.textContent = 'Pro' ;
    }

   
   console.log(level);
   // level1
   if(level == 'level1'){
    // simple pattern - pi
        for (var x = 0; x < m; x++) {
            box.push([]);
        }

        
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
                
                    box[x][y] = "yellow";
                
            }
        }

        for (var x = 0; x < m; x++) {
            box[1][x] = "red";
        }

        for (var x = 1; x < n-1; x++) {
            box[x][2] = "red";

        }

        for (var x = 1; x < n-1; x++) {
            box[x][4] = "red";
        }





   } else if(level == 'level2'){
    // next pattern - O
        for (var x = 0; x < m; x++) {
            box.push([]);
        }
        
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
                    box[x][y] = "yellow";
            }
        }

        for (var x = 1; x < m-2; x++) {
            box[1][x] = "red";
        }

        for (var x = 1; x < n-1; x++) {
            box[x][1] = "red";

        }

        for (var x = 1; x < n-1; x++) {
            box[x][5] = "red";
        }

        for (var x = 1; x < m-2; x++) {
            box[5][x] = "red";
        }

   } else {
    // pro
        for (var x = 0; x < m; x++) {
            box.push([]);
            for (var y = 0; y < n; y++) {
            box[x].push(getRandomColor());
            }
        }
    }
    
    renderBlocks(true);
    // clearFallingClass();
}

/*Rendering tiles in the gridbox using id and creating div and append inside grid by using 2d array which gives location of each box*/
function renderBlocks(firstTime) {
    const gridBox = document.getElementById("grid-box");
    gridBox.innerHTML='';
    gridBox.style.gridTemplateColumns="repeat("+m+",1fr)";
    for(var x=0;x<m;x++){
        for(var y=0;y<n;y++){
            const block = document.createElement("div");
            block.id=x+"_"+y;
            block.classList.add("block", box[x][y]); 
            if(firstTime) block.classList.add("falling");// when falling for the first time it is falling format
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

/*creating random colors for the each div in th block*/
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

/*Fuction Directs when block is clicked that event have to handel removing matching blocks by populating same color neighbous and assinging shake style to blocks*/ 
function blockClicked(eventObj) {
    if(endGameModal.classList.contains("active")){
        return;
    }
    let blockCrush=new Audio("../blockmatchsound.wav");
    blockCrush.volume=0.2;
    blockCrush.play();
    eventObj.preventDefault();//preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
    console.log('block clicked', eventObj.currentTarget.color, eventObj.currentTarget.row, eventObj.currentTarget.col);
    // if the blocks already have shaking, click on it should remove those blocks
    // but, if clicked else where - stop shaking and shake other selected blocks
    removeShakingBlocks(eventObj.currentTarget);
   let sameColorNeighbors=[];
    populateSameColorNeighbors(eventObj.currentTarget.color, eventObj.currentTarget.row, eventObj.currentTarget.col, sameColorNeighbors);
    console.log(sameColorNeighbors);
    assignShakeStyleToBoxes(eventObj.currentTarget.color, sameColorNeighbors);
}

/*This Fuction will perform silding the blocks when empty space is formed by removing the same color blocks*/
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

/* This Fuciton Removes the shaking same colors if yes removes the blocks and backfill it and it adds score update it and check if playe is won*/
function removeShakingBlocks(evtObj) {
    var elems = document.querySelectorAll(".shaking");
    if(!hasClickedElseWhere(elems, evtObj)){
        console.log('removeShakingBlocks ', elems, elems.length);
        let count = 0;
        [].forEach.call(elems, function (el) {
            box[el.row][el.col]='white';
            blocksToFill++;
            count++;
            let blockCrush=new Audio("../Menu_Select_00.wav");
            blockCrush.volume=0.2;
            blockCrush.play();
        });
    

        slideBlocks();
        renderBlocks(false);
        score += count*100;
        updateScore();
        checkWinner();
    }else{
        console.log('clicked else where')
    }
}


function hasClickedElseWhere(elems, evtObj){
    console.log('evtObj: ',evtObj.color, '', evtObj.row, '', evtObj.col);
    var retVal = false;
    if(elems && elems.length>0) {
        [].forEach.call(elems, function (el) {
            console.log('el: ',el.color, '', el.row, '', el.col);
            if(evtObj.color != el.color){
                retVal = true;
            }
        });
    }
    return retVal;
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

    if(row>=m || col>=n || row<0 || col<0) return;
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
