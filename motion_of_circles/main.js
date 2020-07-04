//! Dom
const canvas = document.querySelector("#surface");
const context = canvas.getContext("2d");
// setting an width and height to canvas
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let mouseX,mouseY;
let arrayColor = ["#18ffff", "#1de9b6", "#00e676", "#f57f17", "#ffea00" ,"#ffb300", "#e65100", "#dd2c00", "#d81b60", "#7b1fa2", "#aa00ff", "#304ffe", "#6200ea"];
let signs = [-1, 1];

document.addEventListener("mousemove", function (event) {
    mouseX = event.x;
    mouseY = event.y;
});

//* class
class Arc{
    constructor(x, y, dx, dy, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.fillColor = arrayColor[Math.floor(Math.random() * arrayColor.length)];
    }

    update(){
        if (this.x - this.r - 60 <= mouseX && this.x + this.r + 60 >= mouseX && this.y - this.r - 60 <= mouseY && this.y + this.r + 60>= mouseY) {
            if (this.r >= 60) {
                this.r += 0;
            }
            else{
                this.r ++;
            }
        }
        else{
            if (this.r >= 15) {
                this.r -= 5;
            }
        }

        if (this.x + this.r >= canvasWidth || this.x - this.r <= 0) {
            this.dx =- this.dx;
        }

        if (this.y - this.r <= 0 || this.y + this.r >= canvasHeight) {
            this.dy =- this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = this.fillColor;
        context.fill();
    }
}

let arrArc = [];

for (let i = 0; i < 190; i++) {
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight; 
    let dx = (Math.random() * 2) * signs[Math.floor(Math.random()* signs.length)];
    let dy = (Math.random() * 2) * signs[Math.floor(Math.random()* signs.length)];
    let r = 15;
    arrArc.push(new Arc(x, y, dx, dy, r));
}

function draw() {
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < arrArc.length; i++) {
        arrArc[i].update();
    }    
}

draw();