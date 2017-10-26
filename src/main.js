const electron = require('electron')
const countdown = require('./countdown')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const windows = []

app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        })
    
        win.loadURL(`file://${__dirname}/countdown.html`);
    
        win.on('closed', _ => {
            console.log('exit')
            win = null
        });
    
        windows.push(win);
    })
})


ipc.on('countdown-start', _ => {
    countdown( // come out of countdown at time interval and set it back to the main module
        count => {
            windows.forEach(win => {
                win.webContents.send('countdown', count)            
            })
        }
    )
    console.log('in')
})
