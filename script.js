console.log("running");
let screen = document.getElementById("screen");
let head = document.getElementById("head");
let w = screen.offsetWidth;
let h = screen.offsetHeight;
let y = parseInt(head.style.top) || 10;
let x = parseInt(head.style.left) || 10;
let count = 2;
let ix = 0;
let iy = 0;
let pathx = [];
let pathy = [];
let bodies = [];
let foodx = "";
let foody = "";
let food = "";
let lastframe = 0;
speed = 5;
let dir = "right";
genfood();

function run(ctime) {
    window.requestAnimationFrame(run);
    if ((ctime - lastframe) / 1000 < 1 / speed) {
        return;
    }
    if (dir == "up" && y > 0) {
        y--;
    } else if (dir == "down" && y < h) {
        y++;
    } else if (dir == "left" && x > 0) {
        x--;
    } else if (dir == "right" && x < w) {
        x++;
    }
    position();
}
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
    head.style.top = `${y}px`;
    head.style.left = `${x}px`;
    pathx.push(x);
    if (pathx.length > count) {
        pathx.splice(0, pathx.length - count);
    }
    pathy.push(y);
    if (pathy.length > count) {
        pathy.splice(0, pathy.length - count);
    }
    move();
    colide();
}
function genfood() {
    let r1 = w - 20;
    let r2 = h - 20;
    foodx = Math.floor(Math.random() * r1);
    foody = Math.floor(Math.random() * r2);
    food = document.createElement("div");
    screen.appendChild(food);
    food.classList.add("food");
    food.style.transform = `translate(${foodx}px,${foody}px)`;
}
function eat() {
    screen.removeChild(food);
    genfood();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
    grow();
}
function colide() {
    const headSize = 15;
    const foodSize = 15;

    const headLeft = x;
    const headRight = x + headSize;
    const headTop = y;
    const headBottom = y + headSize;

    const foodLeft = foodx;
    const foodRight = foodx + foodSize;
    const foodTop = foody;
    const foodBottom = foody + foodSize;

    const isOverlap =
        headLeft < foodRight &&
        headRight > foodLeft &&
        headTop < foodBottom &&
        headBottom > foodTop;

    if (isOverlap) {
        console.log("eat");
        eat();
        iy += 1;
        ix += 1;
    }
}
function grow() {
    count++;
    let body = document.createElement("div");
    screen.appendChild(body);
    body.classList.add("body");
    bodies.push(body);
}
function move() {
    for (let i = 0; i < bodies.length; i++) {
        let px = pathx[pathx.length - (i + 1)];
        let py = pathy[pathy.length - (i + 1)];
        if (px !== undefined && py !== undefined) {
            bodies[i].style.transform = `translate(${px}px,${py}px)`;
        }
    }
}
