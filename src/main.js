const electron = require('electron')
const countdown = require('./countdown')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    console.log('ready')
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`);
    mainWindow.on('closed', _ => {
        console.log('exit')
        mainWindow = null
    });
})


ipc.on('countdown-start', _ => {
    countdown( // come out of countdown at time interval and set it back to the main module
        count => {
            mainWindow.webContents.send('countdown', count)
        }
    )
    console.log('in')
})
