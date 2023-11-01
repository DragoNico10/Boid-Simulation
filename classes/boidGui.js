class BoidGui{
    constructor(){
        this.gui=createGui('Boid Control')
        this.components={
            openGuiButton:createButton('', 0, 0, deviceRotation=='portrait'?height/16:width/16, deviceRotation=='portrait'?height/16:width/16),
            closeGuiButton:createButton('Close', 0, height-height/10, width/2, height/10),
            targetSpeedSlider:createSlider('',width/12,height/25,width/3,height/30, 0.50, 5.00),
            resolveSlider:createSlider('',width/12,height/25*3,width/3,height/30, 0.01, 1.00),
            rangeSlider:createSlider('',width/12,height/25*5,width/3,height/30, 20, 150),
            separationSlider:createSlider('',width/12,height/25*7,width/3,height/30, 0.01,0.50),
            cohesionSlider:createSlider('',width/12,height/25*9,width/3,height/30, 0.00,0.50),
            alignmentSlider:createSlider('',width/12,height/25*11,width/3,height/30, 0.00,0.10),
            boidsSlider:createSlider('',width/12,height/25*13,width/3,height/30, 1, 100),
            trailSlider:createSlider('',width/12,height/25*15,width/3,height/30,0,20),
            interact:new MDropdown(width/12,height/25*17,width/3,height/30,['No','Yes']),
            interactType:new MDropdown(width/12,height/25*19,width/3,height/30,['Avoid','Attract'])
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
        this.components.interact.draw()
        this.components.interactType.draw()
        if(this.components.openGuiButton.visible==true){
            this.drawOpenButton()
        }
        if(this.open=true){
            if(deviceType=='desktop'&&mouse.x>width/2&&mouse.pressed())this.components.closeGuiButton.onPress()
            if(deviceType=='mobile'||deviceType=='tablet'){
                for(let touch of touches){
                    if(touch.x>width/2&&isTouching)this.components.closeGuiButton.onPress()
                }
            }
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
        this.components.resolveSlider.val=Resolve
        this.components.rangeSlider.val=Range
        this.components.separationSlider.val=Separation
        this.components.cohesionSlider.val=Cohesion
        this.components.alignmentSlider.val=Alignment
        this.components.boidsSlider.val=Boids
        this.components.trailSlider.val=TrailLength
        this.components.openGuiButton._style.rounding=0
        this.components.targetSpeedSlider._style.rounding=0
        this.components.closeGuiButton._style.rounding=0
        this.components.resolveSlider._style.rounding=0
        this.components.separationSlider._style.rounding=0
        this.components.rangeSlider._style.rounding=0
        this.components.cohesionSlider._style.rounding=0
        this.components.alignmentSlider._style.rounding=0
        this.components.boidsSlider._style.rounding=0
        this.components.trailSlider._style.rounding=0
        this.gui.visible=false
        this.components.closeGuiButton.visible=false
        this.components.targetSpeedSlider.visible=false
        this.components.resolveSlider.visible=false
        this.components.rangeSlider.visible=false
        this.components.separationSlider.visible=false
        this.components.cohesionSlider.visible=false
        this.components.alignmentSlider.visible=false
        this.components.boidsSlider.visible=false
        this.components.trailSlider.visible=false
        this.components.interact.visible=false
        this.components.interactType.visible=false
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
            this.components.trailSlider.visible=true
            this.components.interact.visible=true
            this.components.interactType.visible=true
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
            this.components.trailSlider.visible=false
            this.components.interact.visible=false
            this.components.interactType.visible=false
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
        this.components.trailSlider.onChange=()=>{
            TrailLength=Math.floor(this.components.trailSlider.val)
        }
        this.components.interact.onChange=val=>{
            BAMOT=val
        }
        this.components.interactType.onChange=val=>{
            interactType=val
        }
    }
    drawText(){
        if(deviceRotation=='landscape'){
            textAlign(CENTER)
            textSize(deviceRotation=='portrait'?height/50:width/50)
            stroke(0)
            fill(0)
            text(`Target Speed: ${TargetSpeed}`, width/4, height/35)
            text(`Resolve: ${Resolve}`, width/4, height/30*3.2)
            text(`Range: ${Range}`, width/4, height/30*5.6)
            text(`Separation: ${Separation}`, width/4, height/30*8.1)
            text(`Cohesion: ${Cohesion}`, width/4, height/30*10.5)
            text(`Alignment: ${Alignment}`, width/4, height/30*12.8)
            text(`Number of Boids: ${Boids}`, width/4, height/30*15.2)
            text(`Length of trails: ${TrailLength}`, width/4,height/30*17.8)
            text(deviceType=='desktop'?'Do boids interact with Mouse?':'Do boids interact with fingers?',width/4,height/30*20.1)
            text(deviceType=='desktop'?'How do boids interact with Mouse?':'How do boids interact with fingers?',width/4,height/30*22.5)
        }else{
            textAlign(CENTER)
            textSize(deviceRotation=='portrait'?height/50:width/50)
            stroke(0)
            fill(0)
            text(`Target Speed:`, width/4, height/60)
            text(TargetSpeed, width/4, height/29)
            text(`Resolve:`, width/4, height/60*5.5)
            text(Resolve, width/4, height/30*3.4)
            text(`Range:`, width/4, height/40*6.8)
            text(Range, width/4, height/30*5.8)
            text(`Separation:`, width/4, height/40*10)
            text(Separation, width/4, height/30*8.1)
            text(`Cohesion:`, width/4, height/40*13.2)
            text(Cohesion, width/4, height/30*10.5)
            text(`Alignment:`, width/4, height/40*16.4)
            text(Alignment, width/4, height/30*13)
            text(`Number of Boids:`, width/4, height/40*19.8)
            text(Boids, width/4, height/30*15.5)
            text('Length of Trails:', width/4,height/40*22.9)
            text(TrailLength,width/4,height/40*23.8)
            text('Do boids interact',width/4,height/40*26.1)
            text(deviceType=='desktop'?'with mouse?':'with fingers?',width/4,height/40*27)
            text('How do boids interact',width/4,height/40*29.3)
            text(deviceType=='desktop'?'with mouse?':'with fingers?',width/4,height/40*30.1)
        }
    }
}