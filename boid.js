class Boid{
    constructor(id){
        this.distance;this.target
        this.id=id
        this.sprite=createSprite(random(0, width), random(0, height), 48, 48)
        this.color=[Math.floor(random(0, 255)), Math.floor(random(0, 255)), Math.floor(random(0, 255))]
        this.sprite.draw=()=>{
            push()
            fill(this.color[0], this.color[1], this.color[2])
            noStroke()
            triangle(-8, -5, -8, 5, 8, 0)
            pop()
        }
        boids.push(this)
        this.vX=random(-5, 5)
        this.vY=random(-5, 5)
        this.distX
        this.distY
        boidX.push(this.sprite.x)
        boidY.push(this.sprite.y)
        boidVX.push(this.vX)
        boidVY.push(this.vY)
    }
    run(){
        this.move(this.sprite.x, this.sprite.y)
        this.calculate()
    }
    move(lx, ly){
        this.sprite.x=width/2-this.vX
        this.sprite.y=height/2-this.vY
        this.sprite.pointTo(0, 0)
        this.distance=dist(this.sprite.x, this.sprite.y, 0, 0)
        this.target=(this.vX/this.distance)*TargetSpeed
        this.vX+=Resolve*(this.target-this.vX)
        this.target=(this.vY/this.distance)*TargetSpeed
        this.vY+=Resolve*(this.target-this.vY)
        this.sprite.x=lx+this.vX
        this.sprite.y=ly+this.vY
        if(this.sprite.y<0){
            this.sprite.y+=height
        }
        if(this.sprite.y>height){
            this.sprite.y-=height
        }
        if(this.sprite.x<0){
            this.sprite.x+=width
        }
        if(this.sprite.x>width){
            this.sprite.x-=width
        }
        boidX[this.id]=this.sprite.x
        boidY[this.id]=this.sprite.y
        boidVX[this.id]=this.vX
        boidVY[this.id]=this.vY
    }
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
                this.distX=boidX[otherId]-this.sprite.x
                this.distY=boidY[otherId]-this.sprite.y
                this.distance=Math.sqrt((this.distX*this.distX)+(this.distY*this.distY))
                if(this.distance<Range){
                    boidCount++
                    sumX+=this.distX
                    sumY+=this.distY
                    SVX+=boidVX[otherId]-this.vX
                    SVY+=boidVY[otherId]-this.vY
                    this.vX+=negSep*(this.distX/this.distance)
                    this.vY+=negSep*(this.distY/this.distance)
                }
            }
            otherId++
        }
        this.vX+=Cohesion*(sumX/boidCount)
        this.vY+=Cohesion*(sumY/boidCount)
        this.vX+=Alignment*(SVX/boidCount)
        this.vY+=Alignment*(SVX/boidCount)
    }
}