import { Vector, Circle } from './circle';
import { getRandom } from './util';

console.clear();
var canvas = document.getElementById("canvas") as HTMLCanvasElement;
var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
var bound = new Vector(0, 0);
var circles: Circle[] = [];
var mouse: Vector = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bound = new Vector(canvas.width, canvas.height);
}

function getMouse(dom: HTMLElement, mouseEvent: MouseEvent): Vector {
  var rect = dom.getBoundingClientRect();
  return new Vector(mouseEvent.clientX - rect.left, mouseEvent.clientY - rect.top);
}

function init() {
    window.onload = function () {
        resizeCanvas();
        createCircles();
        window.requestAnimationFrame(draw);
    };

    window.onresize = resizeCanvas;

    canvas.addEventListener("mousemove", function (e) {
      mouse = getMouse(canvas, e);
    }, false);
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
        circles.forEach((neighbor) => {
            if (c == neighbor) return;
            drawLine(c.center, neighbor.center);
        })
        if (mouse) drawLine(c.center, mouse, 150)
    })

    window.requestAnimationFrame(draw);
}

function drawLine(from: Vector, to: Vector, max: number = 80) {
    var dist = from.distTo(to);
    var opacity = 1 - Math.min(dist / max, 1);
    if (!opacity) return;
    ctx.lineWidth = opacity * 3;
    ctx.strokeStyle = `rgba(255,255,255,${opacity}`;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

init();