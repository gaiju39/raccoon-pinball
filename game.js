const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = { x: 180, y: 300, dx: 2, dy: -3, radius: 6 };
let score = 0;
let lives = 3;
const flippers = {
  left: { x: 100, y: 580, width: 60, height: 12 },
  right: { x: 200, y: 580, width: 60, height: 12 }
};

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

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawFlippers();
  updateBall();
  requestAnimationFrame(update);
}

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 壁跳ね返り
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) ball.dx *= -1;
  if (ball.y < ball.radius) ball.dy *= -1;

  // フリッパー衝突
  if (ball.y + ball.radius >= flippers.left.y &&
      ((ball.x >= flippers.left.x && ball.x <= flippers.left.x + flippers.left.width) ||
       (ball.x >= flippers.right.x && ball.x <= flippers.right.x + flippers.right.width))) {
    ball.dy = -Math.abs(ball.dy);
    score += 100;
    document.getElementById("score").innerText = "SCORE: " + score;
  }

  // 落下
  if (ball.y > canvas.height) {
    lives--;
    if (lives === 0) {
      alert("GAME OVER");
      restartGame();
    } else {
      resetBall();
    }
  }
}

function resetBall() {
  ball.x = 180;
  ball.y = 300;
  ball.dx = 2;
  ball.dy = -3;
}

function restartGame() {
  score = 0;
  lives = 3;
  resetBall();
  document.getElementById("score").innerText = "SCORE: 0";
}

// タップでフリッパー位置に移動（簡易）
canvas.addEventListener("touchmove", (e) => {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  if (touchX < canvas.width / 2) {
    flippers.left.x = touchX - flippers.left.width / 2;
  } else {
    flippers.right.x = touchX - flippers.right.width / 2;
  }
});

document.getElementById("restartBtn").addEventListener("click", restartGame);

update();
