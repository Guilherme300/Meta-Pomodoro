let pomoBtn = document.querySelector('#pomodoro-start')
let clicked = false

document.addEventListener('timeout', () => {
    btnPaused()
    audioPlay('./assets/Annoying_Alarm_Clock-UncleKornicob-420925725.wav') 
})        

let audioPlay = (src, vol=0.2)=>{
    let audio = new Audio(src)
    audio.volume = vol
    audio.play()
    setTimeout(()=>{
        audio.pause()    
    }, 2000)
}

pomoBtn.onclick = (ev)=>{ 
    pomoTimer.start()
    
    audioPlay('./assets/Button-SoundBible.com-1420500901.wav')    
    
    if (!clicked){
        pomoBtn.innerHTML = 'PAUSE'
        
        pomoBtn.style.marginLeft = '-5px'
        pomoBtn.style.marginTop = '5px'
        pomoBtn.style.borderLeft = 'none'
        pomoBtn.style.borderBottom = 'none'
        
        clicked = true
        return
    }       
    btnPaused()
}

let btnPaused = ()=>{
    pomoBtn.innerHTML = 'START'

    pomoBtn.style.marginLeft = '0'
    pomoBtn.style.marginTop = '0'
    pomoBtn.style.borderLeft = '5px solid var(--button-border)'
    pomoBtn.style.borderBottom = '5px solid var(--button-border)'
    
    clicked = false
}