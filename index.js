var nombrePokemon = document.getElementById("nombre")
var strPokemon = nombrePokemon.value;
var boton_enviar = document.getElementById("consultar")
var pokemonStr;
var imagenPokemon = document.getElementById('imagenPokemon')

var nombrePokemon = document.getElementById("pokeName")
var tipoPokemon = document.getElementById("pokeType")
var alturaPokemon = document.getElementById("pokeHeight")
var pesoPokemon = document.getElementById("pokeWeight")
var imgPokemon = document.getElementById("pokeIMG")
var habilidadesPokemon = document.getElementById("pokeHab")

boton_enviar.addEventListener('click', function(event){
    event.preventDefault();
    pokemonStr = document.form1.search.value.toLowerCase();
    getPokemon()
})

document.getElementById("borrar").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("nombre").value = ""
    document.getElementById("tablaPokemon").style.display="none"
    
})

var tipo;
var tamanio;
var nombre;
var peso;
var imagen;
var habilidadEsp = []


async function getPokemon(){
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonStr}`)
    const datosPokemon = await respuesta.json();

    imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${datosPokemon.id}.png`
    tipo = (datosPokemon.types[0].type.name)
    tamanio = (datosPokemon.height * 3.9)
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

    anadirDatos()
    habilidadEsp = []
}

function anadirDatos(){
    if (document.getElementById("tablaPokemon").style.display === "none"){
        document.getElementById("tablaPokemon").style.display="";
    }
    nombrePokemon.innerHTML = nombre;
    tipoPokemon.innerHTML = tipo;
    pesoPokemon.innerHTML = peso + " lb";
    alturaPokemon.innerHTML = tamanio + " ''";
    imgPokemon.innerHTML = `<img src='${imagen}'/>`
    habilidadesPokemon.innerHTML = habilidadEsp;
}