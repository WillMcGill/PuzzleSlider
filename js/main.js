var app = document.getElementById("app");
app.className = "container-fluid p-5 border";

var count = 0;
var tileArr = [];
let coordX = 0;
let coordY = 0;
var getDiv = 0;
//var blankTile = "";

//Define the tile constructor
function Tile(idx, currPos, x, y, tileType) {
    this.idx = idx;
    this.currPos = currPos;
    this.x = x;
    this.y = y;
    this.tileType = tileType;


}
// Create Tiles
function MovingTiles(idx, currPos, x, y, tileType, color) {
    Tile.call(this, idx, currPos, x, y, tileType);
    this.color = color;
}


// Create Moving Tile Objects
for (let i = 1; i <= 16; i++) {

    //console.log(i);
    let movingTiles = new MovingTiles(
        i,
        i,
        coordX,
        coordY,
        0,
        "rgb(255,255,255)"
    );

    if (coordX < 3) {
        coordX++;
    }
    else {
        coordY++;
        coordX = 0
    };

    if (movingTiles.idx == 16) {   // blank tile
        movingTiles.tileType = 1;
        movingTiles.color = "rgb(255,255,255)"
    }
    //console.log(movingTiles.idx);

    tileArr.push(movingTiles);


}

//console.log(tileArr); 

MovingTiles.prototype = Object.create(Tile.prototype);
MovingTiles.prototype.constructor = MovingTiles;

//create board
function renderNewBoard() {
    for (let i = 1; i <= 4; i++) {
        var newRow = document.createElement("div");
        newRow.className = "row border";
        app.appendChild(newRow);

        for (let j = 1; j <= 4; j++) {
            var newCol = document.createElement("div");
            newCol.className = "col-3 border mx-auto";
            newCol.id = Number(count);
            //var text = document.createTextNode(count);
            var tile = document.createTextNode(tileArr[count].idx);
            //tile.className = "mx-auto";
            newCol.style.backgroundColor = tileArr[count].color;
            newCol.addEventListener("click", clickHandler);
            newRow.appendChild(newCol);
            newCol.appendChild(tile);
            count++;
        }
    }
    var newRow = document.createElement("div");
    newRow.className = "row";
    var randomButt = document.createElement("button");
    randomButt.className = "btn btn-info mx-auto";
    randomButt.addEventListener("click", randomizeBoard);
    app.appendChild(newRow);
    newRow.appendChild(randomButt);
    randomButt.innerHTML = "Randomize";
}

function clickHandler() {


    getDiv = Number(this.id);
    var n = 0;

    for (n = 0; n <= 15; n++) {
        //console.log({n});
        if (tileArr[n].tileType == 1) {
            //var blank = n;
            console.log("blank tile - ", n);
            break;
        };
    }
    console.log({ getDiv });
    blankTestSwitch(n);
    renderBoardOnClick(n);


}

renderNewBoard();

function blankTestSwitch(n) {

    let blankPosition = tileArr;
    let tempY = "";
    let tempPos = "";
//if (tileArr[getDiv].currPos + 1 == tileArr[n].currPos && tileArr[getDiv].currPos + 1 !== undefined){
    //switch coordinates

    // tempX = tileArr[n].x
    // tileArr[n].x = tileArr[getDiv].x;
    // tileArr[getDiv].x = tempX;

    // tempY = tileArr[n].y;
    // tileArr[n].y = tileArr[getDiv].y;
    // tileArr[getDiv].y = tempY;
if (Math.abs(getDiv - n) == 1 || Math.abs(getDiv - n) == 4 && getDiv % 4 !== 0){
    tempPos = tileArr[n].currPos;
    tileArr[n].currPos = tileArr[getDiv].currPos;
    tileArr[getDiv].currPos = tempPos;

    //switch tile type

    tileArr[n].tileType = 0;
    tileArr[getDiv].tileType = 1;
    console.log({getDiv}, {n});

    let clickTile = document.getElementById(getDiv).innerHTML;
    let blankTile = document.getElementById(n).innerHTML;

    //console.log({ clickTile, blankTile, });

    document.getElementById(getDiv).innerHTML = blankTile;
    document.getElementById(n).innerHTML = clickTile;
}

}

function renderBoardOnClick(n) {


    // let clickTile = document.getElementById(getDiv).innerHTML;
    // let blankTile = document.getElementById(n).innerHTML;

    // //console.log({ clickTile, blankTile, });

    // document.getElementById(getDiv).innerHTML = blankTile;
    // document.getElementById(n).innerHTML = clickTile;

}

function randomizeBoard(){

    for (let i = 1; i <= 100; i++){
    
        
    
    getDiv = Math.floor(Math.random() * 16);
    var n = 0;

    for (n = 0; n <= 15; n++) {
        //console.log({n});
        if (tileArr[n].tileType == 1) {
            //var blank = n;
            //console.log("blank tile - ", n);
            break;
        };
    }
    console.log({ getDiv });
    blankTestSwitch(n);
    renderBoardOnClick(n);}

}