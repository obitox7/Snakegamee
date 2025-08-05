console.log("running");
let screen = document.getElementById("screen");
let w = screen.offsetWidth;
let h = screen.offsetHeight;
let ratio = window.devicePixelRatio || 1;
screen.width = w * ratio;
screen.height = h * ratio;
screen.style.width = w + "px";
screen.style.height = h + "px";
screen.style.backgroundColor = "lightgrey";
let headsize = 20;
let foodsize = 20;
let speed = 10;
let count = 2;
let x = 0;
let y = 0;
let pathx = [0];
let pathy = [0];
let foodx = "";
let foody = "";
let lastframe = 0;
let ctx = screen.getContext("2d");
ctx.scale(ratio, ratio);
let dir = "right";

genfood();

function run(ctime) {
    window.requestAnimationFrame(run);

    let deltaTime = (ctime - lastframe) / 1000; // in seconds
    lastframe = ctime;

    update(deltaTime);
}
function update(deltaTime) {
    let velocity = 80;

    let moveAmount = velocity * deltaTime;

    if (dir == "up" && y > 0) {
        y -= moveAmount;
    } else if (dir == "down" && y < h - headsize) {
        y += moveAmount;
    } else if (dir == "left" && x > 0) {
        x -= moveAmount;
    } else if (dir == "right" && x < w - headsize) {
        x += moveAmount;
    }

    position();
}
console.log(pathx);
window.requestAnimationFrame(run);

function up() {
    if (dir !== "down") dir = "up";
}
function down() {
    if (dir !== "up") dir = "down";
}
function left() {
    if (dir !== "right") dir = "left";
}
function right() {
    if (dir !== "left") dir = "right";
}

function position() {
    pathx.unshift(x);
    pathy.unshift(y);
    if (pathx.length > count) {
        pathx.pop();
    }
    if (pathy.length > count) {
        pathy.pop();
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#e27343";
    ctx.fillRect(foodx, foody, foodsize, foodsize);
    ctx.fillStyle = "#43e268";
    ctx.fillRect(pathx[0], pathy[0], headsize, headsize);
    for (let i = 1; i < count; i++) {
        ctx.fillRect(pathx[i], pathy[i], headsize, headsize);
    }
    let distance = Math.sqrt((pathx[0] - foodx) ** 2 + (pathy[0] - foody) ** 2);
    if (distance < 20) {
        genfood();
        count += 6;
    }
}
function genfood() {
    let r1 = w - foodsize;
    let r2 = h - foodsize;
    foodx = Math.floor(Math.random() * r1);
    foody = Math.floor(Math.random() * r2);
}
