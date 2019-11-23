console.log("Hello World");

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var mousex = 0;
var mousey = 0;

let p = document.querySelector("p")
addEventListener("mousemove", function (){
    mousex = event.clientX;
    mousey = event.clientY;
    p.innerHTML = `I Love you <br> Will you be my <span>friend?</span><br>By the way I am a self taught programmer <br> currently serving in Niger state.<br><br>`+`<small>thanks for visiting here</small>`;
});

var gray = 0.99;
ctx.strokeWidth = 5;
function randomColor() {
    return (
      `rgba(
      ${Math.round(Math.random() * 250)},
      ${Math.round(Math.random() * 250)},
      ${Math.round(Math.random() * 250)},
      ${Math.ceil(Math.random() * 100) / 10 }
      )`
    );
  }

function Ball(){
    this.color= randomColor();
    this.size= Math.random()*20 + 14;
    this.startRadius = this.size
    this.x = Math.random()* (width-this.size * 2) + this.size
    this.y = Math.random() * (height - this.size);
    this.dy = Math.random()*2;
    this.dx = Math.round((Math.random() -0.5)*10)
    this.vel = Math.random()/1
    this.update = function(){
         ctx.beginPath();
         ctx.arc(this.x, this.y,this.size,0,2*Math.PI);
         ctx.fillStyle = this.color;
         ctx.fill(); 
    };
};

var ball = []
for(var i=0; i<35; i++){
    ball.push(new Ball());
}

function animate(){
    if(width != window.innerWidth || height != window.innerHeight){
        width = canvas.width=window.innerWidth;
        height = canvas.height=window.innerHeight;
    }
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height)

    for(var i =0; i < ball.length; i++){
        ball[i].update();
        ball[i].y += ball[i].dy;
        ball[i].x +=ball[i].dx;
        if(ball[i].y + ball[i].size >= height){
            ball[i].dy = -ball[i].dy *gray;
        }else{
            ball[i].dy += ball[i].vel;      
          }
    
    if(ball[i].x + ball[i].size > width || ball[i].x - ball[i].size < 0){
        ball[i].dx = -ball[i].dx;
    }
    if(mousex > ball[i].x -20 && 
      mousex < ball[i].x + 20 && 
      mousey > ball[i].y -50 &&  
      mousey < ball[i].y +50 && 
      ball[i].size < 70){
        ball[i].size += 5
    }else{
        if(ball[i].size > ball[i].startRadius){
            ball[i].size += -5;
        }
    }
}
}

animate();

setInterval(function (){
    ball.push(new Ball());
    ball.splice(0,1)
}, 400)