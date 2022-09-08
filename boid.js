class Boid{
    constructor(id){
        this.distance=0;this.target=0
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
        this.distX=0
        this.distY=0
        boidX.push(this.sprite.x)
        boidY.push(this.sprite.y)
        boidVX.push(this.vX)
        boidVY.push(this.vY)
    }
    run(){
        this.id=boids.indexOf(this)
        this.move(this.sprite.x, this.sprite.y)
        this.calculate()
        if(this.id>=Boids){
            this.destroy()
        }
    }
    move(lx, ly){
        this.sprite.x=width/2-this.vX
        this.sprite.y=height/2-this.vY
        this.sprite.pointTo(width/2, height/2)
        this.distance=dist(this.sprite.x, this.sprite.y, width/2, height/2)
        this.target=(this.vX/this.distance)*TargetSpeed
        this.vX+=Resolve*(this.target-this.vX)
        this.target=(this.vY/this.distance)*TargetSpeed
        this.vY+=Resolve*(this.target-this.vY)
        this.sprite.x=lx+this.vX
        this.sprite.y=ly+this.vY
        if(this.sprite.y<0){
            this.sprite.y+=windowHeight
        }
        if(this.sprite.y>height){
            this.sprite.y-=windowHeight
        }
        if(this.sprite.x<0){
            this.sprite.x+=windowWidth
        }
        if(this.sprite.x>windowWidth){
            this.sprite.x-=windowWidth
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
        if(!isNaN(Cohesion*(sumX/boidCount)))
            this.vX+=Cohesion*(sumX/boidCount)
        if(!isNaN(Cohesion*(sumY/boidCount)))
            this.vY+=Cohesion*(sumY/boidCount)
        if(!isNaN(Alignment*(SVX/boidCount)))
            this.vX+=Alignment*(SVX/boidCount)
        if(!isNaN(Alignment*(SVY/boidCount)))
            this.vY+=Alignment*(SVX/boidCount)
    }
    destroy(){
        this.sprite.destroy()
        boidX.splice(this.id,1)
        boidY.splice(this.id,1)
        boidVX.splice(this.id,1)
        boidVY.splice(this.id,1)
        boids.splice(this.id,1)
        lastId--
    }
}