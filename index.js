var boids=[]
var boidX=[]
var boidY=[]
var boidVX=[]
var boidVY=[]
var shapeTrails=[]
var gui, guiHTML
var lastId=0
var deviceRotation=''
var TargetSpeed=2.85, Resolve=0.2, Range=75, Separation=0.2, Cohesion=0.03, Alignment=0.03, Boids=50, BLU=false, alarmIsActive=false, TrailLength=0
var timer=0
setInterval(() => {
    timer+=0.005
    if(timer>=60){
        timer=0
    }
}, 1);
function setup(){
    canvas=createCanvas(windowWidth, windowHeight)
    createBoids(50, 0)
    gui = new BoidGui()
    frameRate(60)
    deviceRotation = width>height?'landscape':'portrait'
}
function draw(){
    background(0)

    for(let boid of boids){
        boid.run()
    }
    drawSprites()
    if(Boids>boids.length){
        while(boids.length<Boids){
            new Boid(lastId)
            lastId++
        }
    }
    /*if(params.UnlockBoidLimit=='yes'&&!alarmIsActive&&!BLU){
        alarmIsActive=true
        if(window.confirm("Are you sure you want to unlock the limit? Too many boids can start to lag your device.")){
            alarmIsActive=false
            BLU=true
        }else{
            alarmIsActive=false
            params.UnlockBoidLimit=false
        }
    }
    if(params.UnlockBoidLimit=='no'&&BLU){
        BLU=false
    }
    if(BLU){
        params.BoidsMax=1000
    }else{
        params.BoidsMax=200
        if(params.Boids>params.BoidsMax){
            params.Boids=200
        }
    }*/
    gui.draw()
}
let createBoids =(num, startId)=>{
    for(let i = startId;i<num;i++){
        new Boid(i)
        lastId++
    }
}
var windowResized=()=>{
    location.reload()
    /*canvas.remove()
    canvas=createCanvas(windowWidth, windowHeight)
    //while(boids.length!=0){
        for(let boid of boids){
            boid.destroy()
        }
    //}*/
}