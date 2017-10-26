const electron = require('electron')
const ipc = electron.ipcRenderer // inter process communication. Main process <=> Render process


document.getElementById('start').addEventListener('click', _ => {
    ipc.send('countdown-start')
    // console.log('button clicked')
})

ipc.on('countdown', (evt, count) => {
    document.getElementById('count').innerHTML = count
})
