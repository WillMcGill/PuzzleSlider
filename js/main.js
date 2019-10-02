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