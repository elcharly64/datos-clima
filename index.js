import {
    inquirePausa,
    inquireMenu,
    leerInput,
    listaLugares
}  from './helpers/inquirer.js';

import {Buscar} from './models/Busquedas.js';

import * as dotend from 'dotenv';
dotend.config();


const main = async () =>{
    // const texto = await leerInput("Ingrese el texto");
    // console.log(`Texto ingresado ${texto}`);
    let opcion = 1;
    let buscar;
    const busqueda = new Buscar();
    while(opcion !== 0){

        opcion = await inquireMenu();
//        console.log(opcion);
        switch (opcion) {
            case 0:
                console.log(`Saliendo...`);
                break;
            case 1:
                buscar = await leerInput(`Lugar a buscar: `);
                const lugares = await busqueda.buscarLugar(buscar);
                
                const id = await listaLugares(lugares);
                if(id==='0') continue;
                const lugarSel = lugares.find(lugar => lugar.id ===id);
                console.log('Nombre del lugar:',lugarSel.place_name);
                console.log('Longitud:',lugarSel.geometry.coordinates[0]);
                console.log('Latitud:',lugarSel.geometry.coordinates[1]);
                await busqueda.agregarHistorial(lugarSel.place_name.toLowerCase());
                const weatherResult = await busqueda.buscarWeather(lugarSel.geometry.coordinates[0],lugarSel.geometry.coordinates[1]);
                console.log('Descripcion: ',weatherResult.descripcion);
                console.log('Temperatura: ',weatherResult.temp);
                console.log('Minima: ',weatherResult.min);
                console.log('Maxima: ',weatherResult.max);
                await inquirePausa();
                break;
            case 2:
                console.log(`Historial`);
                busqueda.capitalizarTitulo(busqueda.Historial).forEach((l,i)=>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${l}`);
                });
                await inquirePausa();
                break;
            default:
                console.log(`Ingrese una de las opciones correctas`);
                await inquirePausa();
                break;
        }

    }
}


main();






