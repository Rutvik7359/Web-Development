var boardData = [
   -1,  1, -1, -1, -1, -1, -1,  9, -1,
   -1, -1,  4, -1, -1, -1,  2, -1, -1,
   -1, -1,  8, -1, -1,  5, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1,  3, -1,
    2, -1, -1, -1,  4, -1,  1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1,  1,  8, -1, -1,  6, -1, -1,
   -1,  3, -1, -1, -1, -1, -1,  8, -1,
   -1, -1,  6, -1, -1, -1, -1, -1, -1
];

var paletteValue;         //used to initialize the selected value
var lastMove;             //used to point towards the last edited cell


function boardPosition(x, y) {
   return y * 9 + x;
}

function sameBlock(x1, y1, x2, y2) {
   let firstRow = Math.floor(y1 / 3) * 3;
   let firstCol = Math.floor(x1 / 3) * 3;
   return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

function sameRow(x1, y1, x2, y2) {
   return y1 == y2;
}

function sameColumn(x1, y1, x2, y2) {
   return x1 == x2;
}

function overlaps(x1, y1, x2, y2) {
   return sameBlock(x1, y1, x2, y2) || sameRow(x1, y1, x2, y2) || sameColumn(x1, y1, x2, y2);
}
window.onload=function running() {
  var table = document.getElementById("board");                   //displays board
  var palette=document.getElementById("palette");                 //displays palette
  populateTable(table);                                           //to fill board with board data
  populatePalette(palette);                                       //to fill palette with palette values 1-9 and undo.png image
  useBoard(table);                                                //to use the board to fill with selected palette value
  usePalette(palette, table);                                     //to use the palette to fill the board with selected palette value
}
function populateTable(t){
  var table=t;
  var rows=0;
  for(var y=0;y<9;y++){
    var newRow = table.insertRow(rows);
    for(var x=0;x<9;x++){
      var cell = newRow.insertCell(x);
      if(boardData[boardPosition(x,y)]==-1){
        cell.innerText="";
      }
      else{
      cell.innerText=boardData[boardPosition(x,y)];
     }
    }
    rows+=1;
  }
}
function populatePalette(p){
  var palette=p;
  for(var x=1;x<10;x++){
    var text=document.createElement("li");
    var node=document.createTextNode(x);
    text.appendChild(node);
    p.appendChild(text);
  }
  var text=document.createElement("li");
  var img=document.createElement('img');
  img.src="images/undo.png";
  text.appendChild(img);
  p.appendChild(text);
}
function usePalette(palette, table){
  var buttons = palette.getElementsByTagName('li');
  for (var i=0;i<9;i++){
    buttons[i].onclick = function(){
      paletteValue = this.innerHTML;
      console.log(paletteValue);
    }
    buttons[9].onclick =function(){
      lastMove.innerHTML = '';
      for (var i=0;i<9;i++){
        var newRow = table.rows[i];
        for (var j=0;j<9;j++){
          var cell = newRow.cells[j];
          cell.className = '';
        }
      }
    }
  }
}

function useBoard(table){
  for(var y=0;y<9;y++){
    var newRow = table.rows[y];
    for(var x=0;x<9;x++){
      var cell = newRow.cells[x];
      cell.onclick = function(){
        this.innerHTML = paletteValue;
        var x1 = this.parentNode.rowIndex;
        var y1 = this.cellIndex;
        lastMove = this;

        for(var x2=0;x2<9;x2++){
          for(var y2=0;y2<9;y2++){
            if(overlaps(x1,y1,x2,y2)){
              var checkRow = table.rows[x2];
              var checkCell = checkRow.cells[y2];
              if (checkCell.innerHTML == lastMove.innerHTML && checkCell != lastMove){
                checkCell.className = "error";                    //redirects to error css class to show input is incorrect and highlights in red 
                lastMove.className = "error";                     //redirects to error css class to show input is incorrect and highlights in red
              }
            }

          }
        }
      }
    }
  }
}

