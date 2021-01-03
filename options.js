let options = document.querySelector('.options')
let blackScreen = document.querySelector('#black-screen')
let optionsOpenButton = document.querySelector('#open-options')
let optionsCloseButton = document.querySelector('#close-options')
let optionsUpdateButton = document.querySelector('#update-options')

optionsOpenButton.onclick = () => openAll()
optionsCloseButton.onclick = () => closeAll()
blackScreen.onclick = () => closeAll()

optionsUpdateButton.onclick = () => { 
    updateTimers()
    updatePomoTimers()
    closeAll() 
}

const updatePomoTimers = () => {
    let timers = getTimers()
    let timers2 = {}
    ;['workTime', 'restTime', 'longRestTime'].forEach((i)=>{
        timers2 = {...timers2, [i]: timers[i].options[timers[i].selectedIndex].text }    
    })
    for (i in timers2){
        timers2[i] = timers2[i].slice(0, 2)  
    }
    pomoTimer.updateTimers(timers2)
}

const closeAll = () => {    
    options.classList.add('closing')
    
    setTimeout(()=>{
        options.classList.remove('closing')
        blackScreen.style.display = 'none'
        options.style.display = 'none'
    }, 1000 * 0.4)
}

const openAll = () => {
    blackScreen.style.display = 'block'
    options.style.display = 'flex'
}

const checkOptionsStorage = () => {
    return localStorage.getItem('work-time')
}

const getTimers = () => {
    return {
        workTime: document.querySelector('#work-time'),
        restTime: document.querySelector('#rest-time'),
        longRestTime: document.querySelector('#long-rest-time')    
    }
}

const updateTimers = () => {
    let timers = getTimers()
    
    localStorage.setItem('work-time', timers.workTime.value)
    localStorage.setItem('rest-time', timers.restTime.value)
    localStorage.setItem('long-rest-time', timers.longRestTime.value)
}

const setDefaultTimers = () => {
    localStorage.setItem('work-time', '4')
    localStorage.setItem('rest-time', '0')
    localStorage.setItem('long-rest-time', '2')
}

const loadTimers = ()=>{
    let timers = getTimers()
    
    const workTime = localStorage.getItem('work-time')
    const restTime = localStorage.getItem('rest-time')
    const longRestTime = localStorage.getItem('long-rest-time')    
    
    timers.workTime.value = workTime
    timers.restTime.value = restTime
    timers.longRestTime.value = longRestTime
}

if (checkOptionsStorage()){
    loadTimers()
    updatePomoTimers()
}else{    
    setDefaultTimers()
    loadTimers()
    updatePomoTimers()
}