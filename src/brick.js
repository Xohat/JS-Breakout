class Brick
{
    constructor(position, width, height, color, ball)
    {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ball = ball;
    }

    Start()
    {

    }

    Update(deltatime)
    {

    }

    Draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x - this.width/2, this.position.y - this.height/2, this.width, this.height);
    }
}