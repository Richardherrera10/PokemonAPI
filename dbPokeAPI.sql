CREATE DATABASE pokemonAPI;

use pokemonAPI;

Create table pokemon
(idPokemon int not null primary key auto_increment,
fecha datetime,
imagen varchar(255),
nombre varchar(45),
tipo varchar(45),
peso varchar(15),
altura varchar(15),
habilidades varchar(250));