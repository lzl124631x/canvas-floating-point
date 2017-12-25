interface Drawable {
    update(bound: Vector): this;
    draw(ctx: CanvasRenderingContext2D): this;
}

export class Vector {
    constructor(public x: number, public y: number) { }

    distTo(v: Vector) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    move(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
}

export class Circle implements Drawable {
    public speed: Vector = new Vector(0, 0);
    constructor(public center: Vector, public radius: number){}
    update(bound: Vector) {
        this.center.move(this.speed);
        this.bounce(bound);
        return this;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        return this;
    }
    private bounce(bound: Vector) {
        if (this.center.x <= 0) {
            this.center.x *= -1;
            this.speed.x *= -1;
        } else if (this.center.x >= bound.x) {
            this.center.x = bound.x * 2 - this.center.x;
            this.speed.x *= -1;
        }
        if (this.center.y <= 0) {
            this.center.y *= -1;
            this.speed.y *= -1;
        } else if (this.center.y >= bound.y) {
            this.center.y = bound.y * 2 - this.center.y;
            this.speed.y *= -1;
        }
    }
}