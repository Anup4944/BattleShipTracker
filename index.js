// initializing the varibales
let myGridSize = prompt("Enter the size of your grid?");
let enemyGridSize = prompt("Enter the size of your enemy grid?");

let myShip = 3;
let enemyShip = 3;
let enemyLocation = {};

// printGrid(enemyGrid, true);
// printGrid(myGrid);

const placeCharacter = (y, x, c, grid) => {
  grid[y][x] = c;
};

const createGrid = (size) => {
  let grid = []; // each element inside the array is array itself
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

const getRandomInt = (max) => {
  return Math.floor(Math.random * Math.floor(max));
};

const placeRandomCharacter = (c, grid, max) => {
  let didPlace = false;
  while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);

    if (!enemyLocation[`${x}-${y}`]) {
      placeCharacter(x, y, c, grid);
      didPlace = true;
      enemyLocation[`${x}-${y}`] = true;
    }
  }
};

// game setup
for (let i = 1; i < 4; i++) {
  let x = prompt("Enter the X cordinate for your ship number? " + i);
  let y = prompt("Enter the Y cordinate for your ship number?" + i);
  placeCharacter(x, y, "O", myGrid);
  placeRandomCharacter("O", enemyGrid, enemyGridSize);
  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

// game loop
while (enemyShip > 0 && myShip > 0) {
  let x = prompt("Enter X cordinate for your attack");
  let y = prompt("Enter Y cordinate for your attack");

  if (attackFunction(x, y, enemyGrid)) {
    enemyShip--;
  }
  x = getRandomInt(myGridSize);
  y = getRandomInt(myGridSize);

  if (enemyShip > 0 && attackFunction(x, y, myGrid)) {
    myShip--;
  }

  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

// if (myShip < enemyShip) {
//   console.log("YOU HAVE LOST");
// } else {
//   console.log("VICTORY!!!!!");
// }

const printGrid = (grid, isEnemy = false) => {
  const headers = createHeader(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + " ";
    for (let cell of grid[i]) {
      if (isEnemy && cell == "O") {
        rowStr = rowStr + "- ";
      } else {
        rowStr = rowStr + cell + "  ";
      }
    }
    console.log(rowStr);
  }
};

const createHeader = (size) => {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result = result + i + "  ";
  }
  return result;
};

const attackFunction = (x, y, grid) => {
  if (grid[y][x] == "O") {
    grid[y][x] == "!!!";
    return true;
  } else if (grid[y][x] == "-") {
    grid[y][x] = "x";
    return false;
  } else {
    return false;
  }
};

const drawBreak = () => {
  console.log("-----------------------------");
};
