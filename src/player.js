var player = {
    position: {x: 0, y: 0}, 
    velocity: 250,
    width: 100,
    height: 20,

    Start: function () 
    {
        this.position.x = (canvas.width / 2) - this.width / 2;
        this.position.y = canvas.height - 80;
    },

    Update: function (deltaTime) 
    {
        if (Input.IsKeyPressed(KEY_LEFT))
            this.position.x -= this.velocity * deltaTime;
        if (Input.IsKeyPressed(KEY_RIGHT))
            this.position.x += this.velocity * deltaTime;

        //this.position.x = (this.position.x < 0) ? 0 : ((this.position.x + this.width > canvas.width) ? canvas.width - this.width : this.position.x)

        if(this.position.x < 0) // left cap
            this.position.x = 0;
        else if(this.position.x + this.width > canvas.width) // right cap
            this.position.x = canvas.width - this.width;
    },

    Draw: function (ctx) 
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}