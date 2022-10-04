class MDropdown{
    constructor(x=0,y=0,w=50,h=20, options=[]){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.options=options
        this.style={
            bg:{
                color:{
                    mode:'rgb',
                    layers:[130,130,130]
                },
                strokeWeight:2
            },
            text:{
                color:{
                    mode:'rgb',
                    layers:[0,0,0]
                },
                size:this.h,
                strokeWeight:1
            }
        }
        this.val=options[0]
        this.visible=true
        this.open=false
        this.onChange=()=>{}
    }
    draw(){
        if(this.visible==true){
            push()
            strokeWeight(this.style.bg.strokeWeight)
            colorMode(this.style.bg.color.mode)
            fill(this.style.bg.color.layers[0],this.style.bg.color.layers[1],this.style.bg.color.layers[2])
            rect(this.x,this.y,this.w,this.h)
            textSize(this.style.text.size)
            fill(this.style.text.color.layers[0],this.style.text.color.layers[1],this.style.text.color.layers[2])
            textAlign(LEFT,CENTER)
            strokeWeight(this.style.text.strokeWeight)
            text(this.val, this.x+this.w/100, this.y+this.h/2)
            fill(255)
            translate((this.x+this.w)-(this.w/12), this.y)
            stroke(0)
            strokeWeight(2)
            if(!this.open){
                line(0,this.h/4, this.w/18/2, this.h-(this.h/4))
                line(this.w/18,this.h/4, this.w/18/2, this.h-(this.h/4))
            }else{
                line(0,this.h-this.h/4, this.w/18/2, this.h/4)
                line(this.w/18,this.h-this.h/4, this.w/18/2, this.h/4)
            }
            pop()
            if(this.open==true){
                push()
                colorMode(this.style.bg.color.mode)
                fill(this.style.bg.color.layers[0],this.style.bg.color.layers[1],this.style.bg.color.layers[2])
                let h=0
                for(let {} in this.options){
                    h+=this.h
                }
                rect(this.x,this.y+this.h,this.w,h)
                h=this.y+this.h+(this.h/2)
                for(let option of this.options){
                    textAlign(LEFT,CENTER)
                    fill(this.style.text.color.layers[0],this.style.text.color.layers[1],this.style.text.color.layers[2])
                    strokeWeight(this.style.text.strokeWeight)
                    text(option,this.x+this.w/100,h)
                    h+=this.h
                }
                pop()
            }
        }
        if(deviceType=='desktop'){
            if(((mouseX>this.x&&mouseX<this.x+this.w)&&(mouseY>this.y&&mouseY<this.y+this.h)&&mouse.pressed())&&this.visible){
                this.open==true?this.open=false:this.open=true
            }
            if(this.open==true){
                let h=this.h*2
                for(let option of this.options){
                    if(((mouseX>this.x&&mouseX<this.x+this.w)&&(mouseY>this.y+h-this.h&&mouseY<this.y+h)&&mouse.pressed())&&this.visible){
                        this.val=option
                        this.open=false
                        this.onChange(this.val)
                    }
                    h+=this.h
                }
            }
        }else{
            for(let touch of touches){
                if(((touch.x>this.x&&touch.x<this.x+this.w)&&(touch.y>this.y&&touch.y<this.y+this.h)&&isTouching)&&this.visible){
                    this.open==true?this.open=false:this.open=true
                }
                if(this.open==true){
                    let h=this.h*2
                    for(let option of this.options){
                        if(((touch.x>this.x&&touch.x<this.x+this.w)&&(touch.y>this.y+h-this.h&&touch.y<this.y+h)&&isTouching)&&this.visible){
                            this.val=option
                            this.open=false
                            this.onChange(this.val)
                        }
                        h+=this.h
                    }
                }
            }
        }
    }
}