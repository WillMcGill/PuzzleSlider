var app = document.getElementById("app");
app.className = "container-flex d-inline-block";
app.setAttribute('width', '800px');

var count = 0;
var tileArr = [];
let coordX = 0;
let coordY = 0;
var getDiv = 0;
var imageLoc = "imgs/warlock.jpg";

//Define the tile constructor
function Tile(idx, currPos, x, y, tileType) {
    this.idx = idx;
    this.currPos = currPos;
    this.x = x;
    this.y = y;
    this.tileType = tileType;


}
// Create Tiles
function MovingTiles(idx, currPos, x, y, tileType, background) {
    Tile.call(this, idx, currPos, x, y, tileType);
    this.background = background;
}


// Create Moving Tile Objects
for (let i = 1; i <= 16; i++) {

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
        movingTiles.background = "rgb(255,255,255)"
    }

    tileArr.push(movingTiles);


}


MovingTiles.prototype = Object.create(Tile.prototype);
MovingTiles.prototype.constructor = MovingTiles;

//create board
function renderNewBoard() {
    count = 0;
    document.getElementById("app").innerHTML = "";
    //Create Title
    var newRow = document.createElement("div");
    newRow.className = "row";
    var newDiv = document.createElement("div");
    newDiv.className = "h1 mx-auto text-center";
    var title = document.createTextNode("Puzzle Slider")
    newDiv.appendChild(title);
    app.appendChild(newDiv);

    

    renderTiles();

    var newRow = document.createElement("div");
    newRow.className = "row";
    var randomButt = document.createElement("button");
    randomButt.className = "btn btn-info mx-auto";
    randomButt.addEventListener("click", randomizeBoard);
    app.appendChild(newRow);
    newRow.appendChild(randomButt);
    randomButt.innerHTML = "Randomize";

    var newRow = document.createElement("div");
    newRow.className = "row mx-auto";
    var uploadButt = document.createElement("INPUT");
    uploadButt.className = "form-group form-control-file mx-auto";
    uploadButt.setAttribute('type', 'file');
    uploadButt.addEventListener("change", uploadImage);
    app.appendChild(newRow);
    newRow.appendChild(uploadButt);
    //uploadButt.innerHTML = "Upload Image";
}

function renderTiles() {
    count = 0;
    for (let i = 0; i <= 3; i++) {
        var newRow = document.createElement("div");
        newRow.className = "row";
        app.appendChild(newRow);

        for (let j = 0; j <= 3; j++) {
            var newCol = document.createElement("div");
            newCol.className = "col-3 mx-auto p-0 border";
            newCol.setAttribute('width', '200px');
            newCol.id = Number(count);
            var tile = document.createTextNode(tileArr[count].idx);
            var image = document.createElement('img');
            image.src = imageLoc;
            image.setAttribute('width', '850px');
            image.setAttribute('height', '850px');
            var marginLeft = j * -200 + 'px';
            var marginTop = i * -200 + 'px';
            if (count < 15) { image.setAttribute("style", "margin-top:" + marginTop + "; margin-left:" + marginLeft + "; overflow: hidden;") }
            else { image.setAttribute("style", "margin-top:" + marginTop + "; margin-left:" + marginLeft + "; overflow: hidden; opacity: 0;") }
            console.log(marginLeft);

            newCol.addEventListener("click", clickHandler);
            newCol.setAttribute("style", "height:200px; width:200px; overflow: hidden;");
            newRow.appendChild(newCol);
            newCol.appendChild(image);
            count++;
        }
    }
}


function clickHandler() {


    getDiv = Number(this.id);
    var n = 0;

    for (n = 0; n <= 15; n++) {
        if (tileArr[n].tileType == 1) {
            console.log("blank tile - ", n);
            break;
        };
    }
    console.log({ getDiv });
    blankTestSwitch(n);

}

renderNewBoard();

function blankTestSwitch(n) {

    let blankPosition = tileArr;
    let tempY = "";
    let tempPos = "";

    if ((Math.abs(getDiv - n) == 1) || Math.abs(getDiv - n) == 4) {

        if (n % 4 !== 0) {
            tempPos = tileArr[n].currPos;
            tileArr[n].currPos = tileArr[getDiv].currPos;
            tileArr[getDiv].currPos = tempPos;

            //switch tile type

            tileArr[n].tileType = 0;
            tileArr[getDiv].tileType = 1;

            let clickTile = document.getElementById(getDiv).innerHTML;
            let blankTile = document.getElementById(n).innerHTML;


            document.getElementById(getDiv).innerHTML = blankTile;
            document.getElementById(n).innerHTML = clickTile;
            setTimeout(winCheck, 100);
        }

        else if ((getDiv % 4 == 0 && (n + 1) % 4 !== 0) || ((n % 4 == 0 && n - getDiv !== 1))) {
            console.log('move');
            tempPos = tileArr[n].currPos;
            tileArr[n].currPos = tileArr[getDiv].currPos;
            tileArr[getDiv].currPos = tempPos;

            //switch tile type

            tileArr[n].tileType = 0;
            tileArr[getDiv].tileType = 1;

            let clickTile = document.getElementById(getDiv).innerHTML;
            let blankTile = document.getElementById(n).innerHTML;

            //console.log({ clickTile, blankTile, });

            document.getElementById(getDiv).innerHTML = blankTile;
            document.getElementById(n).innerHTML = clickTile;
            setTimeout(winCheck, 100);
        }
    }

}
function randomizeBoard() {

    for (let i = 1; i <= 500; i++) {
        getDiv = Math.floor(Math.random() * 16);
        var n = 0;

        for (n = 0; n <= 15; n++) {
            //console.log({n});
            if (tileArr[n].tileType == 1) {
                break;
            };
        }
        console.log({ getDiv });
        blankTestSwitch(n);
        //renderBoardOnClick(n);}

    }
}
function winCheck() {
    let winCount = 0;
    for (let i = 0; i < 16; i++) {
        if (tileArr[i].idx !== tileArr[i].currPos) {
            break;

        }
        else {
            winCount++;
            if (winCount == 16){
                alert("Winner!");
            }
        }
        
    }
}

function uploadImage(e) {

    let newImage = URL.createObjectURL(e.target.files[0]);

    imageLoc = newImage;
    renderNewBoard();

}