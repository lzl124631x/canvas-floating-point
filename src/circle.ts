import { Vector } from "./vector";

interface Drawable {
    update(bound: Vector): void;
    draw(ctx: CanvasRenderingContext2D, mouseOffset: Vector): void;
}

function offsetPoint(point: Vector, z: number, offset: Vector): Vector {
    let ratio:number = 1 / Math.pow(z + 1, 2);
    return point.add(offset.scale(ratio));
}

function drawLine(ctx: CanvasRenderingContext2D, from: Vector, fromZ: number, to: Vector, toZ: number, offset: Vector, max: number = 100): void {
    let dist = from.distance(to);
    let opacity = 1 - Math.min(dist / max, 1);
    if (!opacity) return;
    from = offsetPoint(from, fromZ, offset);
    to = offsetPoint(to, toZ, offset);
    ctx.lineWidth = opacity * 3;
    ctx.strokeStyle = `rgba(255,255,255,${opacity}`;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export class Circle implements Drawable {
    public speed: Vector = new Vector(0, 0);

    constructor(public center: Vector, public radius: number, public z: number) { }

    public update(bound: Vector): void {
        this.center.addEqual(this.speed);
        this.bounce(bound);
    }

    public draw(ctx: CanvasRenderingContext2D, offset: Vector): void {
        ctx.fillStyle = "#fff";
        ctx.beginPath();

        if (this.z !== 1) {
            ctx.fillStyle = "#777";
        }

        let center = offsetPoint(this.center, this.z, offset);
        ctx.arc(center.x, center.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    public lineTo(ctx: CanvasRenderingContext2D, to: Circle, offset: Vector): void {
        drawLine(ctx, this.center, this.z, to.center, to.z, offset);
    }

    private bounce(bound: Vector) {
        if (this.center.x - this.radius <= 0) {
            this.center.x = 2 * this.radius - this.center.x;
            this.speed.x *= -1;
        } else if (this.center.x + this.radius >= bound.x) {
            this.center.x = 2 * (bound.x - this.radius) - this.center.x;
            this.speed.x *= -1;
        }
        if (this.center.y - this.radius <= 0) {
            this.center.y = 2 * this.radius - this.center.y;
            this.speed.y *= -1;
        } else if (this.center.y + this.radius >= bound.y) {
            this.center.y = 2 * (bound.y - this.radius) - this.center.y;
            this.speed.y *= -1;
        }
    }
}