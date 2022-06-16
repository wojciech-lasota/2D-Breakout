const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidtch = 560;
const boardHight = 300;
let timerId;
const userStart = [230, 10];
let currentPosition = userStart;
const ballspeed = 4;
let xDirection = -ballspeed;
let yDirection = ballspeed;
let score = 0;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
const ballDiameter = 20;
//create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

//draw all blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");

    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

//add user

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw ball

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//mv user

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidtch - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

//add ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 30);

//checl for collison

function checkForCollisions() {
  //check for block collisons
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      //   console.log(allBlocks);
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      //check for win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "you win";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  //check for wall colisions
  if (
    ballCurrentPosition[0] >= boardWidtch - ballDiameter ||
    ballCurrentPosition[1] >= boardHight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  //check for user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  //check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.textContent = "game over";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection == ballspeed && yDirection === ballspeed) {
    yDirection = -ballspeed;
    return;
  }
  if (xDirection == ballspeed && yDirection === -ballspeed) {
    xDirection = -ballspeed;
    return;
  }
  if (xDirection === -ballspeed && yDirection === -ballspeed) {
    yDirection = ballspeed;
    return;
  }
  if (xDirection === -ballspeed && yDirection === ballspeed) {
    xDirection = ballspeed;
    return;
  }
}
