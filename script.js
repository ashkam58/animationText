const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height= innerHeight;
canvas.width=innerWidth;
let particleArray = [];
let adjustX = 10;
let adjustY = 20;

// handle mouse

const mouse ={
    x:null,
    y:null,
    radius:150
}

window.addEventListener('mousemove', function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    //console.log(mouse.x,mouse.y)

})

ctx.fillStyle='white';
ctx.font='30px Times New Roman';
ctx.fillText('A',20,30 );
ctx.strokeStyle = 'white';
ctx.strokeRect(0,0,100,100);
const textCoordinator = ctx.getImageData(0,0,100,100);


 class particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=3;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density=(Math.random()*40)+5;
    }

    draw(){
        ctx.fillStyle='pink';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx+dy*dy);
        let forceDirectionX= dx/distance;
        let forceDirectionY= dy/distance
        let maxDistance = mouse.radius;
        //discuss
        let force = (maxDistance - distance)/maxDistance;
        let directionX = forceDirectionX*force*this.density;
        let directionY = forceDirectionY*force*this.density;
        if(distance<mouse.radius){
            this.x-=directionX;
            this.y-=directionY;

        }
        else{
            if(this.x!==this.baseX){
                let dx = this.x-this.baseX;
                this.x -= dx/10;
            }
            if(this.y!==this.baseY){
                let dy = this.y-this.baseY
                this.y -= dy/10;
        }
        }
     }
    
 }


 //recursive call for the function particle

function init(){
    particleArray=[];
    for(let y=0, y2=textCoordinator.height; y<y2; y++){
        for(let x=0, x2=textCoordinator.width; x <x2; x++){
            if(textCoordinator.data[(y*4*textCoordinator.width)+(x*4)+3]>128){
                let positionX = x +adjustX;
                let positionY = y + adjustY;
                particleArray.push(new particle(positionX*10, positionY*10))
                
            }
        }
    }
    //particleArray.push(new particle(80,90));
    //particleArray.push(new particle(100,40));
 }
 init();
 console.log(particleArray);

 function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i =0; i<particleArray.length; i++)
    {
        particleArray[i].draw();
       particleArray[i].update();
    }
    connect(); 
    requestAnimationFrame(animate); 
 }
 animate();

 function connect(){
    let opacityValue=1;
    for(let a =0 ; a< particleArray.length; a++){
        for(let b=a; b<particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance =  Math.sqrt(dx*dx+dy*dy);
            opacityValue=1-(distance/50);
            ctx.strokeStyle ='rgba(255,255,255,'+ opacityValue +')';
            if(distance<15){
                
                ctx.lineWidth =2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();


            }
        }
    }
 }