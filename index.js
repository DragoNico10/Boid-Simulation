var boids=[]
var boidX=[]
var boidY=[]
var boidVX=[]
var boidVY=[]
var gui
var lastId=0
var TargetSpeed=2.85, Resolve=0.2, Range=75, Separation=0.2, Cohesion=0.03, Alignment=0.03, Boids=250, BLU=false
let params={
    TargetSpeedMin:0.50, TargetSpeedMax:5.00, TargetSpeedStep:0.01,TargetSpeed:2.85,
    ResolveMin:0.01, ResolveMax:1.00, ResolveStep:0.01,Resolve:0.2,
    RangeMin:20, RangeMax:150,RangeStep:1,Range:75,
    SeparationMin:0.00, SeparationMax:0.50, SeparationStep:0.01,Separation:0.2,
    CohesionMin:0.00, CohesionMax:0.50, CohesionStep:0.01,Cohesion:0.03,
    AlignmentMin:0.00, AlignmentMax:0.10, AlignmentStep:0.01, Alignment:0.03,
    BoidsMin:1, BoidsMax:200, BoidsStep:1, Boids:50,
    //UnlockBoidLimit:[false, true]
}
function setup(){
    canvas=createCanvas(windowWidth, windowHeight)
    createBoids(250, 0)
    gui=createGui('Boid Control')
    gui.addObject(params)
    frameRate(60)
}
function draw(){
    background(0)
    correctVars()

    for(let boid of boids){
        boid.run()
    }
    drawSprites()
    if(Boids>boids.length){
        console.log(true)
        while(boids.length<Boids){
            new Boid(lastId)
            lastId++
        }
    }
    /*if(params.UnlockBoidLimit==true){
        
    }*/
}
let createBoids =(num, startId)=>{
    for(let i = startId;i<num;i++){
        new Boid(i)
        lastId++
    }
}
var windowResized=()=>{
    location.reload()
}
let correctVars=()=>{
    TargetSpeed=params.TargetSpeed
    Resolve=params.Resolve
    Range=params.Range
    Separation=params.Separation
    Cohesion=params.Cohesion
    Alignment=params.Alignment
    Boids=params.Boids
}