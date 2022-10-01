class BoidGui{
    constructor(){
        this.gui=createGui('Boid Control')
        this.components={
            openGuiButton:createButton('', 0, 0, deviceRotation=='portrait'?height/16:width/16, deviceRotation=='portrait'?height/16:width/16),
            closeGuiButton:createButton('Close', 0, height-height/10, width/2, height/10),
            targetSpeedSlider:createSlider('',width/12,height/16,width/3,height/15, 0.50, 5.00),
            resolveSlider:createSlider('',width/12,height/16*3,width/3,height/15, 0.01, 1.00),
            rangeSlider:createSlider('',width/12,height/16*5,width/3,height/15, 20, 150),
            separationSlider:createSlider('',width/12,height/16*7,width/3,height/15, 0.01,0.2),
            cohesionSlider:createSlider('',width/12,height/16*9,width/3,height/15, 0.00,0.50),
            alignmentSlider:createSlider('',width/12,height/16*11,width/3,height/15, 0.00,0.10),
            boidsSlider:createSlider('',width/12,height/16*13,width/3,height/15, 1, 200)
        }
        this.setupGui()
    }
    
    draw(){
        if(this.gui.visible==true){
            push()
            fill('rgba(0, 0, 0, 0.5)')
            rect(0, 0, width, height)
            fill(125)
            rect(0, 0, width/2, height)
            pop()
            this.drawText()
        }
        this.gui.draw()
        if(this.components.openGuiButton.visible==true){
            this.drawOpenButton()
        }
    }
    drawOpenButton(){
        let buttonCanvasWidth=this.components.openGuiButton.w
        push()
        rectMode(CENTER)
        fill(0)
        noStroke()
        rect(buttonCanvasWidth/2.8, buttonCanvasWidth/3.5, buttonCanvasWidth/2, buttonCanvasWidth/10)
        rect(buttonCanvasWidth/2.8, buttonCanvasWidth/2, buttonCanvasWidth/2, buttonCanvasWidth/10)
        rect(buttonCanvasWidth/2.8, buttonCanvasWidth-buttonCanvasWidth/3.5, buttonCanvasWidth/2, buttonCanvasWidth/10)
        ellipse(buttonCanvasWidth-buttonCanvasWidth/4, buttonCanvasWidth/3.5, buttonCanvasWidth/7)
        ellipse(buttonCanvasWidth-buttonCanvasWidth/4, buttonCanvasWidth/2, buttonCanvasWidth/7)
        ellipse(buttonCanvasWidth-buttonCanvasWidth/4, buttonCanvasWidth-buttonCanvasWidth/3.5, buttonCanvasWidth/7)
        pop()
    }
    setupGui(){
        this.components.closeGuiButton._style.textSize=deviceRotation=='portrait'?height/25:width/25
        this.components.targetSpeedSlider.val=TargetSpeed
        this.gui.visible=false
        this.components.closeGuiButton.visible=false
        this.components.targetSpeedSlider.visible=false
        this.components.resolveSlider.visible=false
        this.components.rangeSlider.visible=false
        this.components.separationSlider.visible=false
        this.components.cohesionSlider.visible=false
        this.components.alignmentSlider.visible=false
        this.components.boidsSlider.visible=false
        this.components.openGuiButton.onPress=()=>{
            this.gui.visible=true
            this.components.openGuiButton.visible=false
            this.components.closeGuiButton.visible=true
            this.components.targetSpeedSlider.visible=true
            this.components.resolveSlider.visible=true
            this.components.rangeSlider.visible=true
            this.components.separationSlider.visible=true
            this.components.cohesionSlider.visible=true
            this.components.alignmentSlider.visible=true
            this.components.boidsSlider.visible=true
        }
        this.components.closeGuiButton.onPress=()=>{
            this.gui.visible=false
            this.components.openGuiButton.visible=true
            this.components.closeGuiButton.visible=false
            this.components.targetSpeedSlider.visible=false
            this.components.resolveSlider.visible=false
            this.components.rangeSlider.visible=false
            this.components.separationSlider.visible=false
            this.components.cohesionSlider.visible=false
            this.components.alignmentSlider.visible=false
            this.components.boidsSlider.visible=false
        }
        this.components.targetSpeedSlider.onChange=()=>{
            TargetSpeed=this.components.targetSpeedSlider.val
        }
        this.components.resolveSlider.onChange=()=>{
            Resolve=this.components.resolveSlider.val
        }
        this.components.rangeSlider.onChange=()=>{
            Range=Math.floor(this.components.rangeSlider.val)
        }
        this.components.separationSlider.onChange=()=>{
            Separation=this.components.separationSlider.val
        }
        this.components.cohesionSlider.onChange=()=>{
            Cohesion=this.components.cohesionSlider.val
        }
        this.components.alignmentSlider.onChange=()=>{
            Alignment=this.components.alignmentSlider.val
        }
        this.components.boidsSlider.onChange=()=>{
            Boids=Math.floor(this.components.boidsSlider.val)
        }
    }
    drawText(){
        if(deviceRotation=='landscape'){
            textAlign(CENTER)
            textSize(deviceRotation=='portrait'?height/50:width/50)
            stroke(0)
            fill(0)
            text(`Target Speed: ${TargetSpeed}`, width/4, height/20)
            text(`Resolve: ${Resolve}`, width/4, height/20*3.5)
            text(`Range: ${Range}`, width/4, height/20*6)
            text(`Separation: ${Separation}`, width/4, height/20*8.5)
            text(`Cohesion: ${Cohesion}`, width/4, height/20*11)
            text(`Alignment: ${Alignment}`, width/4, height/20*13.5)
            text(`Number of Boids: ${Boids}`, width/4, height/20*16)
        }else{
            textAlign(CENTER)
            textSize(deviceRotation=='portrait'?height/50:width/50)
            stroke(0)
            fill(0)
            text(`Target Speed:`, width/4, height/40)
            text(TargetSpeed, width/4, height/20)
            text(`Resolve:`, width/4, height/40*6)
            text(Resolve, width/4, height/20*3.5)
            text(`Range:`, width/4, height/40*11)
            text(Range, width/4, height/20*6)
            text(`Separation:`, width/4, height/40*16)
            text(Separation, width/4, height/20*8.5)
            text(`Cohesion:`, width/4, height/40*21)
            text(Cohesion, width/4, height/20*11)
            text(`Alignment:`, width/4, height/40*26)
            text(Alignment, width/4, height/20*13.5)
            text(`Number of Boids:`, width/4, height/40*31)
            text(Boids, width/4, height/20*16)
        }
    }
}