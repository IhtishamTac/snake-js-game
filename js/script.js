const board_border = "black";
const board_background = "white";
const board_background_tile = "yellow";
const board_background_tile_size = 20;
const snake_col = "lightblue";
const snake_border = "darkblue";


let snake;

function initSnake() {
  return [
    { x: 260, y: 301 },
    { x: 240, y: 301 },
    { x: 220, y: 301 },
    { x: 200, y: 301 },
    { x: 180, y: 301 },
    { x: 160, y: 301 },
  ];
}

let playerName = "";

let score = 0;

let dx = 20;
let dy = 0;

let food_x;
let food_y;

const map = document.getElementById("mapCanvas");
const map_ctx = map.getContext("2d");

const playerNames = document.getElementById("playerName");
const buttonInput = document.getElementById("playz");


document.addEventListener("keydown", change_direction);


function play() {
  playerNames.valueOf;

  document.getElementById("container").style.display = "none";
  map.style.display = "block";

  start();
}

function start() {
  snake = initSnake();
  dx = 20;
  dy = 0;
  main();
  gen_food();
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    drawSnake();
    if (game_over()) return;
    move_snake();
    drawFood();
    main();
  }, 200);
}

function clearCanvas() {
  map_ctx.fillStyle = board_background;
  map_ctx.strokeStyle = board_border;
  map_ctx.fillRect(0, 0, map.width, map.height);
  map_ctx.strokeRect(0, 0, map.width, map.height);
  for (let x = 0; x < map.width; x += board_background_tile_size) {
    for (let y = 0; y < map.height; y += board_background_tile_size) {
      if ((x + y) % (board_background_tile_size * 2) === 0) {
        map_ctx.fillStyle = board_background_tile;
        map_ctx.fillRect(
          x,
          y,
          board_background_tile_size,
          board_background_tile_size
        );
      }
    }
  }
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakeParts) {
  map_ctx.fillStyle = snake_col;
  map_ctx.strokeStyle = snake_border;
  map_ctx.fillRect(snakeParts.x, snakeParts.y, 20, 20);
  map_ctx.strokeRect(snakeParts.x, snakeParts.y, 20, 20);
}

function move_snake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if(has_eaten_food){
    score += 10;
    document.getElementById('score').innerHTML = score;
    gen_food();
  }else{
  }
  snake.pop();
}

function change_direction(event) {
  const W = 87;
  const A = 65;
  const S = 83;
  const D = 68;

  const keyPressed = event.keyCode;
  const up = dy === -20;
  const down = dy === 20;
  const right = dx === 20;
  const left = dx === -20;

  if (keyPressed === W && !down) {
    dy = -20;
    dx = 0;
  }

  if (keyPressed === S && !up) {
    dy = 20;
    dx = 0;
  }

  if (keyPressed === A && !right) {
    dy = 0;
    dx = -20;
  }

  if (keyPressed === D && !left) {
    dy = 0;
    dx = 20;
  }
}


function game_end() {
  for (let i = 4; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (has_collided) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > map.width - 20;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > map.width - 20;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function game_over() {
  if (game_end()) {
    if (window.confirm("Restart?")) {
      start();
      return true;
    } else {
      window.location.reload();
    }
  }
}

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

function gen_food() {
    food_x = random_food(0, map.width - 20);
    food_y = random_food(0, map.height - 20);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) {
            gen_food();
        }
    })
}

function drawFood() {
    map_ctx.fillStyle = 'lightgreen';
    map_ctx.strokeStyle = 'darkgreen';
    map_ctx.fillRect(food_x, food_y, 20, 20);
    map_ctx.strokeRect(food_x, food_y, 20, 20);
}