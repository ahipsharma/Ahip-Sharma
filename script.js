let adjustX = 10;
let adjustY = 10;

VanillaTilt.init(document.querySelectorAll(".card1"), {
    max: 25,
    speed: 400,
    glare: false,
    "max-glare": 1
});
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: false,
    "max-glare": 1
});

VanillaTilt.init(document.querySelector(".card2"), {
    max: 25,
    speed: 400,
    glare: false,
    "max-glare": 1
});

VanillaTilt.init(document.querySelector(".card3"), {
    max: 25,
    speed: 400,
    glare: false,
    "max-glare": 1
});


const canvas = document.getElementById('canvas1');
const cxt = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let mouse = {
    x: null,
    y: null,
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.radius = 50;
});

cxt.fillStyle = 'blue';
cxt.font  = '16px Oleo Script Swash Caps, cursive';
cxt.fillText('Ahip', 30, 10);
cxt.fillText('Shar ma',25, 30);
cxt.fillText('🎶',80, 17);
cxt.strokeStyle = 'yellow';
cxt.strokeRect(0, 0, 100, 100);
const textCoordinates = cxt.getImageData(0, 0, 100, 100); 

class Particle{
    constructor (x,y){
        this.x = x;
        this.y = y;
        this.size = 4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 5) + 1;
    }
    draw(){
        cxt.fillStyle = 'c7ff20';
        cxt.beginPath();
        cxt.arc(this.x,this.y, this.size, 0 , Math.PI*2);
        cxt.closePath();
        cxt.fill(); 
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }
        else{
            if(this.x !==this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !==this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}
console.log(textCoordinates)
function init(){
    particleArray = []
    for(let y = 0,y2=textCoordinates.height; y<y2;y++){
        for(let x = 0, x2=textCoordinates.width; x<x2;x++){
            if(textCoordinates.data[(y *4 * textCoordinates.width) + (x * 4 + 3)]>128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
}
init()
console.log(particleArray);
function animate(){
     cxt.clearRect(0, 0, canvas.width, canvas.height);
     for(let i = 0; i<particleArray.length; i++){
         particleArray[i].draw();
         particleArray[i].update();
        //  connect();
     }
     requestAnimationFrame(animate);
}
animate(); 

function connect(){
    for(let a = 0; a<particleArray.length;a++){
        for(let b = 0;b < particleArray.length;b++){
            // let dx = mouse.x - this.x;
            // let dy = mouse.y - this.y;
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100){
                cxt.strokeStyle = 'white';
                cxt.lineWidth = 2;
                cxt.beginPath();
                cxt.moveTo(particleArray[a].x,particleArray[b].y);
                cxt.lineTo(particleArray[a].x,particleArray[b].y);
                cxt.stroke();
            }
        }
    }
}