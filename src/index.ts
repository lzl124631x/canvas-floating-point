import { Vector, Circle } from './circle';
import { getRandom } from './util';

console.clear();
var canvas = document.getElementById("canvas") as HTMLCanvasElement;
var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
var bound = new Vector(0, 0);
var circles: Circle[] = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bound = new Vector(canvas.width, canvas.height);
}

function init() {
    window.onload = function () {
        resizeCanvas();
        createCircles();
        window.requestAnimationFrame(draw);
    };

    window.onresize = resizeCanvas;
}

function createCircles() {
    for (var i = 0; i < 100; ++i) {
        var radius = getRandom(1, 5);
        var x = getRandom(0, canvas.width);
        var y = getRandom(0, canvas.height);
        var circle = new Circle(new Vector(x, y), radius);
        var speedX = getRandom(-1, 1);
        var speedY = getRandom(-1, 1);
        circle.speed = new Vector(speedX, speedY);
        circles.push(circle);
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    cleanCanvas();

    circles.forEach((c) => {
        c.update(bound);
        c.draw(ctx);
    })

    window.requestAnimationFrame(draw);
}

function drawLine(from: Vector, to: Vector) {
    var dist = from.distTo(to);
    var opacity = 1 - Math.min(dist / 200, 1);
    if (!opacity) return;
    ctx.lineWidth = opacity * 3;
    ctx.strokeStyle = `rgba(0,255,255,${opacity}`;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

init();