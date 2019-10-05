var app = document.getElementById("app");
app.className = "container-fluid p-5 border";

var count = 0;
var tileArr =  [];
let coordX = 0;
let coordY = 0; 
var getDiv = 0;

//Define the tile constructor
function Tile(idx, currPos, x, y, z) {
    this.idx = idx;
    this.currPos = currPos;
    this.x = x;
    this.y = y;
    this.z = z;
    
    
  }
// Create Tiles
  function MovingTiles(idx, currPos, x, y, z, color) {
    Tile.call(this, idx, currPos, x, y, z);
    this.color = color;
  }

  
// Create Moving Tile Objects
  for (let i = 1; i <= 16; i++){

      //console.log(i);
      let movingTiles =  new MovingTiles(
          i, 
          i,
          coordX,
          coordY,
          0,
          "rgb(255,222,173)"
      );

      if (coordX < 3){
          coordX++;
      }
      else  {coordY++;
            coordX = 0};

        if (movingTiles.idx == 16){   // blank tile
            movingTiles.z = 1;
            movingTiles.color = "rgb(255,255,255)"
        }
        //console.log(movingTiles.idx);
        
      tileArr.push(movingTiles);

    
  }

  //console.log(tileArr); 

MovingTiles.prototype = Object.create(Tile.prototype);
MovingTiles.prototype.constructor = MovingTiles;

//create board
function renderNewBoard(){
for (let i = 1; i <= 4; i++){
    var newRow = document.createElement("div");
    newRow.className = "row border";
    app.appendChild(newRow);

        for (let j = 1; j <= 4; j++){
            var newCol = document.createElement("div");
            newCol.className = "col-3 border mx-auto";
            newCol.id = count;
            //var text = document.createTextNode(count);
            var tile = document.createTextNode(tileArr[count].idx);
            //tile.className = "mx-auto";
            newCol.style.backgroundColor = tileArr[count].color;
            newCol.addEventListener("click", clickHandler);
            newRow.appendChild(newCol);
            newCol.appendChild(tile);
            count++;
        }
}}

function clickHandler(){
    getDiv = this.id;
    //console.log({getDiv});
    console.log(getDiv);
    blankTestSwitch();
    renderBoardOnClick();
    
}

renderNewBoard();

function blankTestSwitch(){
    let n = 1;
    let tempX = "";
    let tempY = "";
    let tempPos = "";
    for (let n = 0; n <= 15; n++){
       // console.log({n});
        if (tileArr[n].z == 1){
            console.log({n});
            break;
            };
    }

    
    //switch coordinates
    
    tempX = tileArr[n].x   
    tileArr[n].x = tileArr[getDiv].x;
    tileArr[getDiv].x = tempX;
   
    tempY = tileArr[n].y;    
    tileArr[n].y = tileArr[getDiv].y;
    tileArr[getDiv].y = tempY;

    tempPos = tileArr[n].currPos;    
    tileArr[n].currPos = tileArr[getDiv].currPos;
    tileArr[getDiv].currPos = tempPos;

    tileArr[n].z = 0;
    tileArr[getDiv].z = 1;
    console.log('z', tileArr[n].z, 'getDiv', tileArr[getDiv].z );
}

function renderBoardOnClick(){
    //console.log({tileArr});
//     //newCount = 1;
    
   for(let m = 0; m <= 15; m++){
//     let newText = tileArr[m].idx;
//     document.getElementById(newText).innerHTML = tileArr[m + 1].backgroundColor;
     console.log(tileArr[m].idx, tileArr[m].currPos);
        //document.getElementById(tileArr[m + 1].currPos).innerHTML = "clicked";    
    }

//     }
    
 }