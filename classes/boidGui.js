class GUI{
    constructor(){
        this.gui=new Group()
        this.guiButton= new this.gui.Sprite(0,0,deviceRotation='portrait'?height/8:width/8,deviceRotation='portrait'?height/8:width/8)
        this.guiButton.fillColor=150
        this.guiButton.draw=function(){
            let temp=gui.guiButton.w
            push()
            fill(gui.guiButton.fillColor)
            rectMode(CORNER)
            rect(0,0,temp,temp)
            rectMode(CENTER)
            fill(0)
            rect(temp/2.8, temp/3.5, temp/2, temp/10)
            rect(temp/2.8, temp/2, temp/2, temp/10)
            rect(temp/2.8, temp-temp/3.5, temp/2, temp/10)
            ellipse(temp-temp/4, temp/3.5, temp/7)
            ellipse(temp-temp/4, temp/2, temp/7)
            ellipse(temp-temp/4, temp-temp/3.5, temp/7)
            pop()
        }
        //this.guiContainer=new this.gui.Sprite(0,0)
        this.guiButton.layer=9999
        /*this.guiContainer.elements={
            
        }*/
        this.animation="none"
        this.state="closed"
    }
    draw(){
        //guiButton mouse handling
        if((mouse.x>this.guiButton.x&&mouse.x<this.guiButton.x+this.guiButton.w)&&(mouse.y>this.guiButton.y&&mouse.y<this.guiButton.y+this.guiButton.h)){
            this.guiButton.fillColor=200
            if(mouseIsPressed){
                if(this.state="closed")
                    this.animation="open"
                else
                    this.animation="close"
            }
        }else this.guiButton.fillColor=150
    }
}