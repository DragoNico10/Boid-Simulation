var boids=[]
var boidX=[]
var boidY=[]
var boidVX=[]
var boidVY=[]
var gui, guiHTML
var lastId=0
var TargetSpeed=2.85, Resolve=0.2, Range=75, Separation=0.2, Cohesion=0.03, Alignment=0.03, Boids=250, BLU=false, alarmIsActive=false
var params={
    TargetSpeedMin:0.50, TargetSpeedMax:5.00, TargetSpeedStep:0.01,TargetSpeed:2.85,
    ResolveMin:0.01, ResolveMax:1.00, ResolveStep:0.01,Resolve:0.2,
    RangeMin:20, RangeMax:150,RangeStep:1,Range:75,
    SeparationMin:0.00, SeparationMax:0.50, SeparationStep:0.01,Separation:0.2,
    CohesionMin:0.00, CohesionMax:0.50, CohesionStep:0.01,Cohesion:0.03,
    AlignmentMin:0.00, AlignmentMax:0.10, AlignmentStep:0.01, Alignment:0.03,
    BoidsMin:1, BoidsMax:200, BoidsStep:1, Boids:50,
    UnlockBoidLimit:['no', 'yes'],
    BoidsAvoidMouse:['no', 'yes']
}
function setup(){
    canvas=createCanvas(windowWidth, windowHeight)
    createBoids(250, 0)
    gui=createGui('Boid Control')
    gui.addObject(params)
    guiHTML=document.body.getElementsByClassName('qs_main')[0].getElementsByClassName('qs_content')[0]
    frameRate(60)
    fixGui()
}
function draw(){
    background(0)
    correctVars()

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
    if(params.UnlockBoidLimit=='yes'&&!alarmIsActive&&!BLU){
        alarmIsActive=true
        if(window.confirm("Are you sure you want to unlock the limit? Tho many boids can start to lag your device.")){
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
        guiHTML.getElementsByClassName('qs_container')[6].getElementsByClassName('qs_range')[0].max=1000
    }else{
        params.BoidsMax=200
        guiHTML.getElementsByClassName('qs_container')[6].getElementsByClassName('qs_range')[0].max=200
        if(params.Boids>params.BoidsMax){
            guiHTML.getElementsByClassName('qs_container')[6].children[0].innerHTML='<b>Boids:</b> 200'
            params.Boids=200
        }
    }
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
let fixGui=()=>{
    guiHTML.children[7].children[0].innerHTML='<b>Unlock Boid Limit?</b>'
    guiHTML.children[8].children[0].innerHTML='<b>Do Boids Avoid Mouse?</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Not available in mobile)'
}