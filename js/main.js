var app = document.getElementById("app");
app.className = "container-fluid p-5 border";

var count = 0;


//create board

for (let i = 1; i <= 4; i++){
    var newRow = document.createElement("div");
    newRow.className = "row border";
    app.appendChild(newRow);

        for (let j = 1; j <= 4; j++){
            var newCol = document.createElement("div");
            newCol.className = "col-3 border";
            newCol.id = count;
            var text = document.createTextNode(count);
            newRow.appendChild(newCol);
            newCol.appendChild(text);
            count++;
        }

        
}
//Define the tile constructor


function Tile(idx, currPos, y, x, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.idx = idx;
    this.currPos = currPos;
    
  }
// Create Tiles
  function MovingTiles(idx, currPos, x, y, z, color) {
    Tile.call(this, idx, currPos, x, y, z);
    this.color = color;
  }

  var tileArr =  [];
  let coordX = 0;
  let coordY = 0; 
// Create Moving Tile Objects
  for (let i = 1; i <= 15; i++){

      console.log(i);
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
      else {coordY++;
            coordX = 0};

      tileArr.push(movingTiles);
  }
    


MovingTiles.prototype = Object.create(Tile.prototype);
MovingTiles.prototype.constructor = MovingTiles;