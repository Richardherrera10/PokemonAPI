const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const mysql = require('mysql2/promise');
const { Console } = require('console');

let ventana
function createWindow(){
    ventana = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences:{
            preload: path.join(app.getAppPath(),'/preload.js')
        }
    })
    ventana.loadFile('index.html')
}

ipcMain.on('nuevoPokemon', function(event, args){
    insertDB(args)
})

ipcMain.on('consultarPokemon', function(event, args){
    consultaDB(args)
})


//insertar consulta del API a la DB
async function insertDB(pokemon) {
   
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'pokemonAPI'});
   
    const [rows] = await connection.query("INSERT INTO pokemon(fecha, imagen, nombre, tipo, peso, altura, habilidades)"+
                                            "VALUES(?,?,?,?,?,?,?)", [pokemon.fechaSubir, pokemon.imagenP, pokemon.nombre, 
                                                pokemon.tipo, pokemon.peso, pokemon.altura, pokemon.habilidades]);
}

//Consultar información de la DB
async function consultaDB(pokemon) {
   
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'pokemonAPI'});

    const [rows, fields] = await connection.execute("SELECT * FROM pokemon where nombre = ?", [pokemon]);
    ventana.webContents.send("enviarConsulta", rows)
   
   
 
    
}

app.whenReady().then(createWindow)