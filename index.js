var boids=[]
var boidX=[]
var boidY=[]
var boidVX=[]
var boidVY=[]
var shapeTrails=[]
var gui
var lastId=0
var deviceRotation=''
var deviceType
var BAMOT='No',HDBIWMOT='Avoid',TargetSpeed=2.85, Resolve=0.2, Range=75, Separation=0.2, Cohesion=0.03, Alignment=0.03, Boids=50, BLU=false, alarmIsActive=false, TrailLength=0
var timer=0
let lf
var dT
var hasTouched=false,isTouching=false
setInterval(() => {
    timer+=0.005
    if(timer>=60){
        timer=0
    }
}, 1);
function setup(){
    createCanvas(windowWidth, windowHeight)
    deviceType=getDeviceType()
    createBoids(50, 0)
    gui = new BoidGui()
    frameRate(60)
    deviceRotation = width>height?'landscape':'portrait'
}
function draw(){
    

    if(lf!=undefined){
        dT=performance.now()-lf
    }
    lf=performance.now()
    background(0)

    for(let boid of boids){
        boid.run()
    }
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
    if(hasTouched&&isTouching){
        isTouching=false
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
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };
ontouchstart=()=>{
    isTouching=true
    hasTouched=true
}
ontouchend=()=>{
    hasTouched=false
}