import { Vector } from "./vector";
import { Circle } from "./circle";
import { getRandom, getRandomInteger } from "./util";

console.clear();
let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let bound = new Vector(0, 0);
let circles: Circle[] = [];
let mouse: Vector = new Vector(0, 0);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bound = new Vector(canvas.width, canvas.height);
}

function getMouse(dom: HTMLElement, mouseEvent: MouseEvent): Vector {
    let rect = dom.getBoundingClientRect();
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
    for (let i = 0; i < 100; ++i) {
        let radius = getRandom(1, 5);
        let x = getRandom(0, canvas.width);
        let y = getRandom(0, canvas.height);
        let z = 4 - Math.floor(i / 25);
        let circle = new Circle(new Vector(x, y), radius, z);
        let speedX = getRandom(-1, 1);
        let speedY = getRandom(-1, 1);
        circle.speed = new Vector(speedX, speedY);
        circles.push(circle);
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    cleanCanvas();

    let offset = mouse.sub(bound.scale(1 / 2));

    circles.forEach((c: Circle) => {
        c.update(bound);

        c.draw(ctx, offset);
        circles.forEach((neighbor: Circle) => {
            if (c == neighbor) return;
            c.lineTo(ctx, neighbor, offset);
        });
        // if (mouse) drawLine(c.center, mouse, 150);
    })

    window.requestAnimationFrame(draw);
}

init();