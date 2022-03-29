const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        nuevoPokemon: (datos) => ipcRenderer.send('nuevoPokemon',datos)
        ,
        consultarPokemon: (datos) => ipcRenderer.send('consultarPokemon',datos)
        ,
        enviarConsulta: (callback) =>ipcRenderer.on("enviarConsulta", callback)
    }
 ) 