const {app, BrowserWindow} = require('electron')
const path = require('path')


var ventana
function createWindow(){
    ventana = new BrowserWindow({
        width: 500,
        height: 500,
    })
    ventana.loadFile('index.html')
}

app.whenReady().then(createWindow)