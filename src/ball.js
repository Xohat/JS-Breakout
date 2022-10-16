var dx = 2;
var dy = -2;

class Ball
{
    constructor(position) 
    {
        this.position = position;
        this.radius = 10;

        this.direction = {x: 1, y: 1};
        this.velocity = 200;
    }

    Start()
    {
        
    }

    Update(deltaTime)
    {
        this.position.x += dx;
        this.position.y += dy;

        if (this.position.x > canvas.width - this.radius || this.position.x < 0 + this.radius) // left cap
            dx = -dx;
        else if (this.position.y > canvas.height - this.radius || this.position.y < 0 + this.radius) // right cap
            dy = -dy;

            if (this.position.x > player.position.x && this.position.x < player.position.x + player.width && this.position.y == player.position.y)
            {
                dy = -dy;
            }
 
        if (this.position.y > player.position.y + player.height + this.radius)
        {
            location.reload();
            alert("Game Over")
        }
    }

    Draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, PI2, false);
        ctx.closePath();
        ctx.fill();
    }
}