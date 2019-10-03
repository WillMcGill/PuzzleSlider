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
        console.log(movingTiles.idx);
        
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
            newCol.id = count + 1;
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
    console.log({getDiv});
    blankTestSwitch();
}

renderNewBoard();

function blankTestSwitch(){
    let n = 1;
    let tempX = "";
    let tempY = "";
    let tempPos = "";
    for (n = 1; n <= 15; n++){
        console.log({n});
        if (tileArr[n].z == 1){
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
    console.log(tileArr[n].currPos, tileArr[getDiv].currPos, tempPos)

    // console.log({tempY});
    // console.log("new n" ,tileArr[n].y);
    //console.log(tileArr[n].x, tileArr[getDiv].x, tempX);
// console.log(tileArr[n].y, tileArr[getDiv].y, tempY);
    // console.log("new div", tileArr[getDiv]);
    // console.log(tileArr[n].y, tileArr[getDiv].y, tempY);
    //switch Current Position
}

// function changeLoc(){
//     

//     tempX = tileArr[n].x
//     console.log(tempX);
    
// }