import { Buscar } from "./models/Busquedas.js";

const texto = [
    'Penny lane is in my ears And in My eyes',
    'Sit and drink pennyroyal tea'
];
const busqueda = new Buscar;
console.log('Resultado:',busqueda.capitalizarTitulo(texto));
