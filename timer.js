class PomodoroTimer{
    constructor(){
        this.cicle = 0        
        this.work = true        
        
        this.started = false
        this.loop

        this.timers = {
            workTime: '25',
            restTime: '05',
            longRestTime: '15'
        }
        
        this.actualTime = { minutes: this.timers.workTime, seconds: '00' }
        
        this.time = new CustomEvent('time', { detail: { time: `${this.actualTime.minutes}:${this.actualTime.seconds}` } })

        this.timeout = new Event('timeout')
        
        this.working = new CustomEvent('timeWorking', { detail: { work: this.work } })        
        
        this.fullTimeChange = new CustomEvent('fullTimeChange', { detail: { time: this._getFullMls(), cicle: this.cicle, work: this.work } })

        this.mlstime = new CustomEvent('mlstime', { detail: { time: 0 } })
        
        window.addEventListener('load', () => {
            document.dispatchEvent(this.fullTimeChange)   
        })
    }
    
    start = () => {
        if (!this.started){
            this.loop = setInterval(()=>{
                if (this.actualTime.seconds == 0){

                    if (this.actualTime.minutes == 0){
                        clearInterval(this.loop)
                        document.dispatchEvent(this.timeout)
                        this._triggerWorkingEv()
                        this._updateCicle()
                        this._triggerFullTimeChangeEv()
                        this._triggerTimeEv()
                        this.started = false
                        return                
                    }                    
                    
                    this.actualTime.minutes -= 1
                    this.actualTime.minutes = this._putZero(this.actualTime.minutes)                    
                    this.actualTime.seconds = 60
                }
                this.actualTime.seconds -= 1
                this.actualTime.seconds = this._putZero(this.actualTime.seconds)
                    
                this._triggerTimeEv()
                this._triggerMlstimeEv()         
                
            }, 1000)
            
            this.started = true
            return        
        }
        clearInterval(this.loop)
        this.started = false
    }
    
    updateTimers = (timers) => {
        this.timers = timers
        this.actualTime = { minutes: this.timers.workTime, seconds: '00' }
        this._triggerTimeEv()
        this._triggerFullTimeChangeEv()
    }    
    
    _updateCicle = () => {
        if (this.work){
            this.cicle++
            this.work = false
            if (this.cicle == 4){
                this.actualTime.minutes = this.timers.longRestTime
                this.cicle = 0
                return        
            }
            this.actualTime.minutes = this.timers.restTime
            return
        }
        this.work = true
        this.actualTime.minutes = this.timers.workTime
    }
    
    _triggerTimeEv = () => {
        const time = `${this.actualTime.minutes}:${this.actualTime.seconds}`
        this.time.detail.time = time 
        document.dispatchEvent(this.time)    
    }
    
    _triggerMlstimeEv = () => {
        const mls = this._getFullMls()
        this.mlstime.detail.time = mls
        document.dispatchEvent(this.mlstime)    
    }
    
    _triggerFullTimeChangeEv = () => {
        this.fullTimeChange.detail.time = this._getFullMls()
        this.fullTimeChange.detail.cicle = this.cicle
        this.fullTimeChange.detail.work = this.work
        document.dispatchEvent(this.fullTimeChange)
    }
    
    _triggerWorkingEv = ()=>{
        this.working.detail.work = !this.work
        document.dispatchEvent(this.working)       
    }
    
    _getFullMls = () => {
        return (this.actualTime.minutes * 60 * 1000) + (this.actualTime.seconds * 1000)            
    }
    
    _putZero = (n) => {
        return n < 10 ? '0' + n : n    
    }
    
}