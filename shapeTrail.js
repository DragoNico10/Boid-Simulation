class ShapeTrail{
    constructor(toDraw, span, color, bid, x, y, rotation){
        this.decay=1/span
        this.alpha=1
        this.drawFigure=toDraw
        this.color=color
        this.boid=bid
        this.x=x
        this.y=y
        this.r=rotation
    }
    run(){
        if(boids[this.boid]){push()
        translate(this.x, this.y)
        rotate(this.r)
        this.drawFigure(this.alpha, this.color)
        pop()
        this.alpha-=this.decay
        if(this.alpha<=0){
            boids[this.boid].trails.splice(boids[this.boid].trails.indexOf(this), 1)
        }}
    }
}