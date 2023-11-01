class Boid{
    constructor(id){
        this.trails=[]
        this.distance=0;this.target=0
        this.id=id
        this.sprite=createSprite(random(0, width), random(0, height))
        this.color=[random(0, 360), 100, 90]
        this.sprite.draw=()=>{
            this.trails.push(new ShapeTrail((alpha, color)=>{
                colorMode(HSB)
                fill(color[0], color[1], color[2], alpha)
                noStroke()
                beginShape()
                vertex(-8*this.sprite.scale, -5*this.sprite.scale)
                vertex(8*this.sprite.scale, 0)
                vertex(-8*this.sprite.scale, 5*this.sprite.scale)
                vertex(-2*this.sprite.scale, 0)
                endShape()
            },TrailLength, this.color, this.id, this.sprite.x, this.sprite.y, this.sprite.rotation))
        }
        boids.push(this)
        this.vX=random(-5, 5)
        this.vY=random(-5, 5)
        this.distX=0
        this.distY=0
    }
    run(){
        this.move(this.sprite.x, this.sprite.y)
        this.calculate()
        if(this.id>=Boids-1){
            this.destroy()
        }
        while(this.color[0]>360){
            this.color[0]-=360
        }
        while(this.color[0]<0){
            this.color[0]+=360
        }
        for(let trail of this.trails){
            trail.run()
        }
        this.sprite.velocity.x=this.vX*(deltaTime/16)*this.sprite.scale
        this.sprite.velocity.y=this.vY*(deltaTime/16)*this.sprite.scale
        if(this.sprite.velocity.x>(20*this.sprite.scale)||this.sprite.velocity.y>(20*this.sprite.scale))this.sprite.isSuperFast=true
        else this.sprite.isSuperFast=false
        this.sprite.scale= deviceRotation=='portrait'?height/1600:width/1600
    }
    move(lx, ly){
        this.sprite.x=width/2-this.vX
        this.sprite.y=height/2-this.vY
        this.pointTo(width/2, height/2)
        this.sprite.rotationSpeed=0
        this.distance=dist(this.sprite.x, this.sprite.y, width/2, height/2)
        this.sprite.x=lx
        this.sprite.y=ly
        if(!isNaN(this.vX/this.distance))
        this.target=(this.vX/this.distance)*TargetSpeed
        this.vX+=Resolve*(this.target-this.vX)
        if(!isNaN(this.vY/this.distance))
        this.target=(this.vY/this.distance)*TargetSpeed
        this.vY+=Resolve*(this.target-this.vY)
        if(this.sprite.y<0){
            this.sprite.y+=height
            this.color[0]=(new Date().getSeconds()+new Date().getMilliseconds()/1000)*6
        }
        if(this.sprite.y>height){
            this.sprite.y-=height
            this.color[0]=(new Date().getSeconds()+new Date().getMilliseconds()/1000)*6+50
        }
        if(this.sprite.x<0){
            this.sprite.x+=width
            this.color[0]=(new Date().getSeconds()+new Date().getMilliseconds()/1000)*6+100
        }
        if(this.sprite.x>width){
            this.sprite.x-=width
            this.color[0]=(new Date().getSeconds()+new Date().getMilliseconds()/1000)*6+150
        }
        
    }
    pointTo(x, y){
		let yDelta = y - this.sprite.y;
		let xDelta = x - this.sprite.x;
		if (!isNaN(xDelta) && !isNaN(yDelta) && (xDelta !== 0 || yDelta !== 0)) {
		  let radiansAngle = Math.atan2(yDelta, xDelta);
		  this.sprite.rotation = 360 * radiansAngle / (2 * Math.PI);
		}
	  };
    calculate(){
        let negSep=0-Separation
        let otherId=0
        let boidCount=0
        let sumX=0
        let SVX=0
        let sumY=0
        let SVY=0
        for(let i = 0;i<boids.length;i++){
            if(this.id!=otherId){
                this.distX=boids[otherId].sprite.x-this.sprite.x
                this.distY=boids[otherId].sprite.y-this.sprite.y
                this.distance=Math.sqrt((this.distX*this.distX)+(this.distY*this.distY))
                if(this.distance<Range*this.sprite.scale){
                    boidCount++
                    sumX+=this.distX
                    sumY+=this.distY
                    SVX+=boids[otherId].sprite.velocity.x-this.vX
                    SVY+=boids[otherId].sprite.velocity.y-this.vY
                    if(!isNaN(negSep*(this.distX/this.distance)))
                    this.vX+=negSep*(this.distX/this.distance)
                    if(!isNaN(negSep*(this.distY/this.distance)))
                    this.vY+=negSep*(this.distY/this.distance)
                }
            }
            otherId++
        }
        if(!isNaN(Cohesion*(sumX/boidCount)))
            this.vX+=Cohesion*(sumX/boidCount)
        if(!isNaN(Cohesion*(sumY/boidCount)))
            this.vY+=Cohesion*(sumY/boidCount)
        if(!isNaN(Alignment*(SVX/boidCount)))
            this.vX+=Alignment*(SVX/boidCount)
        if(!isNaN(Alignment*(SVY/boidCount)))
            this.vY+=Alignment*(SVX/boidCount)
        if(deviceType=='desktop'){
            if(dist(this.sprite.x, this.sprite.y, mouseX, mouseY)<Range*this.sprite.scale&&interact=='Yes'){
                if(interactType=='Avoid'){
                    this.distX=mouseX-this.sprite.x
                    this.distY=mouseY-this.sprite.y
                    this.vX+=negSep*(this.distX/dist(this.sprite.x, this.sprite.y, mouseX, mouseY))
                    this.vY+=negSep*(this.distY/dist(this.sprite.x, this.sprite.y, mouseX, mouseY))
                }else{
                    this.distX=mouseX-this.sprite.x
                    this.distY=mouseY-this.sprite.y
                    this.vX+=Cohesion*(this.distX/dist(this.sprite.x, this.sprite.y, mouseX, mouseY))
                    this.vY+=Cohesion*(this.distY/dist(this.sprite.x, this.sprite.y, mouseX, mouseY))
                }
            }
        }else{
            for(let pos of touches){
                if(dist(this.sprite.x, this.sprite.y, pos.x, pos.y)<Range*this.sprite.scale&&interact=='Yes'){
                    if(interactType=='Avoid'){
                        this.distX=pos.x-this.sprite.x  
                        this.distY=pos.y-this.sprite.y
                        this.vX+=negSep*(this.distX/dist(this.sprite.x, this.sprite.y, pos.x, pos.y))
                        this.vY+=negSep*(this.distY/dist(this.sprite.x, this.sprite.y, pos.x, pos.x))
                    }else{
                        this.distX=pos.x-this.sprite.x  
                        this.distY=pos.y-this.sprite.y
                        this.vX+=Cohesion*(this.distX/dist(this.sprite.x, this.sprite.y, pos.x, pos.y))
                        this.vY+=Cohesion*(this.distY/dist(this.sprite.x, this.sprite.y, pos.x, pos.x))
                    }
                }
            }
        }
    }
    destroy(){
        this.sprite.remove()
        boids.splice(this.id,1)
        lastId-- 
    }
}