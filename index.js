// initializing the varibales
let myGridSize = prompt("Enter the size of your grid?");
let enemyGridSize = prompt("Enter the size of your enemy grid?");

const createGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = "-";
    }
  }
  return grid;
};

let myGrid = createGrid(myGridSize);
let enemyGrid = createGrid(enemyGridSize);

const createHeader = (size) => {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result = result + i + "  ";

    return result;
  }
};

const printGrid = (grid, isEnemy = false) => {
  const headers = createHeader(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + " ";
    for (let cell of grid[i]) {
      if (isEnemy && cell == "S") {
        rowStr = rowStr + "- ";
      } else {
        rowStr = rowStr + cell + "  ";
      }
    }
    console.log(rowStr);
  }
};

printGrid(enemyGrid, true);
printGrid(myGrid);
