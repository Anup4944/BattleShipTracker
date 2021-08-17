// initializing the varibales
let myGridSize = prompt("Enter the size of your grid?");
let enemyGridSize = prompt("Enter the size of your enemy grid?");
let myShip = 3;
let enemyShip = 3;
let enemyLocation = {};

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

const createHeader = (size) => {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result = result + i + "  ";
  }
  return result;
};

const printGrid = (grid, isEnemy = false) => {
  const headers = createHeader(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    // iterate throught outer array
    let rowStr = i + " ";
    for (let cell of grid[i]) {
      if (isEnemy && cell == "O") {
        // if its enemy and  has their ship on , we dont want to see the ship.
        rowStr += "- ";
      } else {
        // if its enemy but their ship is not there
        rowStr += cell + "  ";
      }
    }
    console.log(rowStr);
  }
};

printGrid(enemyGrid, true);
printGrid(myGrid);

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)); // give us random interger between 0 and max.
};

const placeCharacter = (y, x, c, grid) => {
  // c is the charachter
  // console.log(x, y, typeof x);
  // console.log(grid);
  grid[y][x] = c;
};

const placeRandomCharacter = (c, grid, max) => {
  let didPlace = false; // we dont want computer to place ship in occupied space

  while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);

    if (!enemyLocation[`${x}-${y}`]) {
      // to keep track of place
      placeCharacter(x, y, c, grid); // finding random place to put enemys ship
      didPlace = true;
      enemyLocation[`${x}-${y}`] = true; // this will not allow emeny to put ship on that space.
    }
  }
};

const drawBreak = () => {
  console.log("-----------------------------"); // seperating grid with a line
};

// game setup
for (let i = 1; i < 4; i++) {
  let x = +prompt("Enter the X cordinate for your ship number? ");
  let y = +prompt("Enter the Y cordinate for your ship number?");
  placeCharacter(x, y, "O", myGrid);
  placeRandomCharacter("O", enemyGrid, enemyGridSize);
  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

const attackFunction = (x, y, grid) => {
  if (grid[y][x] == "O") {
    grid[y][x] = "!"; // ! represents hit
    return true;
  } else if (grid[y][x] == "-") {
    grid[y][x] = "x"; // x represents miss
    return false;
  } else {
    return false;
  }
};

// game loop
while (enemyShip > 0 && myShip > 0) {
  let x = +prompt("Enter X cordinate for your attack");
  let y = +prompt("Enter Y cordinate for your attack");
  // console.log(x, y, typeof x);
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

if (myShip < enemyShip) {
  console.log("YOU HAVE LOST");
} else {
  console.log("YOU HAVE WON");
}
