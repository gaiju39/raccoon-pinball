const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;
let ball = { x: 180, y: 500, dx: 2, dy: -3, radius: 8 };
let flippers = {
  left: { x: 90, y: 580, width: 60, height: 10 },
  right: { x: 210, y: 580, width: 60, height: 10 }
};
let isLeftTouched = false;
let isRightTouched = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ccc";
  ctx.fill();
  ctx.closePath();
}

function drawFlippers() {
  ctx.fillStyle = "pink";
  ctx.fillRect(flippers.left.x, flippers.left.y, flippers.left.width, flippers.left.height);
  ctx.fillRect(flippers.right.x, flippers.right.y, flippers.right.width, flippers.right.height);
}

function drawScore() {
  document.getElementById("score").innerText = `SCORE: ${score}`;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawFlippers();
  drawScore();

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) ball.dx *= -1;
  if (ball.y < ball.radius) ball.dy *= -1;

  if (ball.y > canvas.height) {
    lives--;
    if (lives === 0) {
      alert("ゲームオーバー！");
      restartGame();
    } else {
      resetBall();
    }
  }

  requestAnimationFrame(update);
}

function resetBall() {
  ball.x = 180;
  ball.y = 500;
  ball.dx = 2;
  ball.dy = -3;
}

function restartGame() {
  score = 0;
  lives = 3;
  resetBall();
}

canvas.addEventListener("touchstart", (e) => {
  const touchX = e.touches[0].clientX;
  if (touchX < canvas.width / 2) isLeftTouched = true;
  else isRightTouched = true;
});

canvas.addEventListener("touchend", () => {
  isLeftTouched = false;
  isRightTouched = false;
});

document.getElementById("restartBtn").addEventListener("click", restartGame);

update();