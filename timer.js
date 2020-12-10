class PomodoroTimer{
    constructor(){
        this.cicle = 0        
        
        this.started = false
        this.loop

        this.minutes = '25'
        this.seconds = '00'
        
        this.time = new CustomEvent('time', { detail: { time: `${this.minutes}:${this.seconds}` } })
        this.timeout = new Event('timeout')
        this.mlstime = new CustomEvent('mlstime', { detail: { time: 0 } })
    }
    
    start = () => {
        if (!this.started){
            this.loop = setInterval(()=>{
                if (this.seconds == 0){

                    if (this.minutes == 0){
                        clearInterval(this.loop)
                        document.dispatchEvent(this.timeout)
                        return                
                    }                    
                    
                    this.minutes -= 1
                    this.minutes = this._putZero(this.minutes)                    
                    this.seconds = 60
                }
                this.seconds -= 1
                this.seconds = this._putZero(this.seconds)
                    
                this._triggerTimeEv()
                this._triggerMlstimeEv()         
                
            }, 1000)
            
            this.started = true
            return        
        }
        clearInterval(this.loop)
        this.started = false
    }
    
    _triggerTimeEv = ()=>{
        const time = `${this.minutes}:${this.seconds}`
        this.time.detail.time = time 
        document.dispatchEvent(this.time)    
    }
    
    _triggerMlstimeEv = ()=>{
        const mls = (this.minutes * 60 * 1000) + (this.seconds * 1000)
        this.mlstime.detail.time = mls
        document.dispatchEvent(this.mlstime)    
    }
    
    _audio = (link) => {
        let audio = new Audio(link)
        audio.play()
    }
    
    _putZero = (n) => {
        return n < 10 ? '0' + n : n    
    }
}