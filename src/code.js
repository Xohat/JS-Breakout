
var canvas;
var ctx;

var targetDeltaTime = 1 / 60;
var currentDeltaTime = 0;
var time = 0,
    FPS  = 0,
    frames    = 0,
    acumDelta = 0;
var timeSinceBegining = 0;

var bricks = [];
var brickWidth = null;
var brickHeight = null;
var numberOfBricks=null;
var numberOfColumns = 7;
var numberOfRows = 7;

window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDeltaTime * 1000);
    	};
}) ();

window.onload = BodyLoaded;

function BodyLoaded()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    Start();
    Loop();
}

function Start()
{
    time = Date.now();

    player.Start();
    ball_ball = new Ball({x: canvas.width / 2, y: player.position.y});
    ball_ball.Start();

    brickWidth = canvas.width / numberOfColumns;
    brickHeight = canvas.height/2 / numberOfRows;
    numberOfBricks = numberOfColumns*numberOfRows;

    for(let i = 0; i < numberOfBricks; ++i)
    {
        bricks[i] = new Brick({x:brickWidth/2 + brickWidth * (i%numberOfColumns), y:brickHeight/2 + brickHeight * Math.floor((i/numberOfRows))}, brickWidth,brickHeight,getRandomColor(), ball_ball);
        bricks[i].Start();
    }
}

function Loop ()
{
    // prepare the next loop
    requestAnimationFrame(Loop);

    //deltaTime
    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    currentDeltaTime = deltaTime;
    
    time = now;

    // frames counter
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= 1;
    }
    
    if (deltaTime > 100)
        deltaTime = 100;

    // Game logic -------------------
    Update(deltaTime);

    // Draw the game ----------------
    Draw(ctx);
    
    Input.PostUpdate();
}

function checkCollision()
{
    for (let i = 0; i < bricks.length; ++i) 
    {
        if (ball_ball.position.x + ball_ball.radius > bricks[i].position.x - bricks[i].width/2 && ball_ball.position.x - ball_ball.radius < bricks[i].position.x + bricks[i].width/2)
        {
            if (ball_ball.position.y - ball_ball.radius < bricks[i].position.y + bricks[i].height && ball_ball.position.y + ball_ball.radius < bricks[i].position.y + bricks[i].height)
            {   
                dy = -dy;
                bricks.splice(i, 1);
                console.log("Ayuda");
            }
        }
    }
}

function Update(deltaTime)
{
    timeSinceBegining += deltaTime;

    player.Update(deltaTime);
    ball_ball.Update(deltaTime);

    for(let i = 0; i < bricks.length; ++i)
    {
        bricks[i].Update(deltaTime);
    }
    checkCollision();
}

function Draw(ctx)
{
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.Draw(ctx);
    ball_ball.Draw(ctx);
    for(let i = 0; i < bricks.length; ++i)
    {
        bricks[i].Draw(ctx);
    }
   
    // draw the frame counter
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS regular";
    ctx.fillText("FPS=" + FPS, 10, 30);
    ctx.fillText("deltaTime=" + currentDeltaTime, 10, 50);
    ctx.fillText("currentFPS=" + (1/currentDeltaTime).toFixed(2), 10, 70);
}
