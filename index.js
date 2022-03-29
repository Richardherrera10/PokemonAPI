var nombrePokemon = document.getElementById("nombre")
var strPokemon = nombrePokemon.value;
var boton_enviar = document.getElementById("consultar")
var pokemonStr;
var imagenPokemon = document.getElementById('imagenPokemon')
var boton_guardar = document.getElementById("guardar")
var boton_consultar = document.getElementById("baseDatos")
var nombrePokemon = document.getElementById("pokeName")
var tipoPokemon = document.getElementById("pokeType")
var alturaPokemon = document.getElementById("pokeHeight")
var pesoPokemon = document.getElementById("pokeWeight")
var imgPokemon = document.getElementById("pokeIMG")
var habilidadesPokemon = document.getElementById("pokeHab")
const format1 = "YYYY-MM-DD HH:mm:ss"


disableGuardar(true)

//boton para consultar pokemon desde el API
boton_enviar.addEventListener('click', function(event){
    event.preventDefault();
    
    var fecha = new Date();
    datetime = moment(fecha).format(format1)
    pokemonStr = document.form1.search.value.toLowerCase();
    getPokemon()
    
})
//boton para borrar input y tabla
document.getElementById("borrar").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("nombre").value = ""
    document.getElementById("tablaPokemon").style.display="none"
    
})
//boton para guardar en base de datos la consulta al api
boton_guardar.addEventListener('click', function(event){
    event.preventDefault();
    alert("Guardado!")
    console.log(alturaPokemon)
    console.log("Se guardó en base de datos")
    let subirPokemon = {
        nombre: nombrePokemon.innerHTML,
        tipo: tipoPokemon.innerHTML,
        peso:  pesoPokemon.innerHTML,
        altura: alturaPokemon.innerHTML,
        imagenP: imagen,
        habilidades: habilidadesPokemon.innerHTML,
        fechaSubir: datetime
    }
    window.comunicacion.nuevoPokemon(subirPokemon)
    console.log(subirPokemon)
    document.getElementById("nombre").value = ""
    
})

//boton para buscar desde la base de datos
boton_consultar.addEventListener("click", function(event){

    try {
        event.preventDefault();
        console.log("Consultando base de datos")
        document.getElementById("titulo").innerHTML = "Buscar en la base de datos";
        boton_enviar.disabled = true;
        boton_enviar.style.backgroundColor  = "grey"
        boton_enviar.style.cursor = "default"
        
        window.comunicacion.consultarPokemon(document.form1.search.value.toLowerCase())
    
        window.comunicacion.enviarConsulta(function(event, args){
            let fechaConsulta = moment(args[0].fecha).format(format1)
            console.log(fechaConsulta) 
            document.getElementById("fecha").innerHTML = `Consulta de ${args[0].nombre} realizada el ${fechaConsulta}`
            anadirDatos(args[0].nombre,args[0].tipo, args[0].peso, args[0].altura, args[0].imagen, args[0].habilidades)
        })        
        if (pokemonStr == ""){
            throw "No escribio nada"
        }else {

            
        }
    } catch (error) {
       (alert(error))
    }


})
var tipo;
var tamanio;
var nombre;
var peso;
var imagen;
var habilidadEsp = []


async function getPokemon(){

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonStr}`)
        const datosPokemon = await respuesta.json();
        console.log(datosPokemon)
        imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${datosPokemon.id}.png`
        tipo = (datosPokemon.types[0].type.name)
        tamanio = (Math.round(datosPokemon.height))/10
        nombre = (datosPokemon.name)
        peso = Math.round((datosPokemon.weight)/4.3)
        
        //para conseguir las habilidades
        let result = [];

        for(var i in datosPokemon.abilities){
            result.push([i, datosPokemon.abilities[i]]);
        }
        
        result = result.map((e) =>{
            habilidadEsp.push(e[1].ability.name)
        })

        anadirDatos(nombre, tipo, peso, tamanio, imagen, habilidadEsp)
        habilidadEsp = []    
        disableGuardar(false)
    } catch (error) {
        console.log(error)
        alert("Escriba el nombre de un Pokemon!")
    }

}

function anadirDatos(name, type, weight, height, image, abis){
    if (document.getElementById("tablaPokemon").style.display === "none"){
        document.getElementById("tablaPokemon").style.display="";
    }
    nombrePokemon.innerHTML = name;
    tipoPokemon.innerHTML = type;
    pesoPokemon.innerHTML = weight + " lb";
    alturaPokemon.innerHTML = height + " m";
    imgPokemon.innerHTML = `<img src='${image}'/>`
    habilidadesPokemon.innerHTML = abis;
}

//deshabilitar boton guardar
function disableGuardar (deshabilitar){
    if (deshabilitar){
        boton_guardar.disabled = true;
        boton_guardar.style.backgroundColor  = "grey"
        boton_guardar.style.cursor = "default"
    } 
    else {
        boton_guardar.disabled = false;
        boton_guardar.style.cursor = "pointer"
        boton_guardar.style.backgroundColor  = ""
    }
}