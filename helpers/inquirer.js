

import inquirer from 'inquirer';
import 'colors';
let menuOpciones = [
	{
		type: "list",
		name: "patito",
		message: "\tSeleccione accion".yellow,
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Buscar ciudad`
			},
			{
				value: 2,
				name: `${'2.'.green} Historial`
			},
			{
				value: 0,
				name: `${'0.'.green} Salir del sistema`
			}
		]
	}
]

let pausaOpciones = [
	{
		type: "input",
		name: "pausa",
		message: "Presione"+"ENTER".red+" para continuar",
	}
]

const inquireMenu = async ()=>{

//esta vaina dejó de funcionar de repente :(
//	console.clear();
	console.log('\x1Bc');

    console.log(`\n\n\tAplicación del clima mundial`);
    console.log(`\t********** *** ***** *******`);

	const {patito} = await inquirer.prompt(
		menuOpciones
	);
	return patito;
}

const listaLugares = async (lugares = []) =>{
	console.log('\x1Bc');
	let arregloChoices = [];
	if(lugares.length>0){
		lugares.forEach((e,i) =>{
			let idx = `${i+1}. `.yellow;
			arregloChoices.push({
				value: e.id,
				name: idx+e.place_name
			});
		});
		arregloChoices.unshift(
		{
			value: '0',
			name: '0. '.yellow+'Retornar'.blue,
		});

	}
	
	let opciones = 	{
		type: "list",
		name: "opcLugares",
		message: "Seleccione un lugar",
		choices: arregloChoices
	}
		
	let {opcLugares} =  await inquirer.prompt(opciones);
	return opcLugares;
}


const inquirePausa = async ()=>{
	console.log('\n');
	await inquirer.prompt(
		pausaOpciones
	)
}


const leerInput = async (mensaje)=>{
	let question = {
		type: 'input',
		message: mensaje,
		name: 'descr',
		validate(value){
			if(value.length==0) return "Ingrese un texto, por favor";
			return true;
		}
	}
	
	const {descr} = await inquirer.prompt(question);
	return descr;
}

const confirmar = async (mensaje)=>{
	const preguntas = {
		type: 'confirm',
		message: mensaje,
		name: 'ok'
	}
	const {ok} = await prompt(preguntas);
	return ok;
}

const listadoCheckList = async (tareas = []) =>{
	console.log('\x1Bc');
	let arregloChoices = [];
	if(tareas.length>0){
		tareas.forEach((e,i) =>{
			let idx = `${i+1}. `.yellow;
			let completadas = e.ccmpletadoEn !== null ? true: false;
			arregloChoices.push({
				value: e.id,
				name: idx+e.descr,
				checked: completadas
			});
		});

	}
	
	let opciones = 	{
		type: "checkbox",
		name: "ids",
		message: "Seleccione tarea(s)",
		choices: arregloChoices
	}
		
	let {ids} = await prompt(opciones);
	return ids;
}

// export default {
// 	inquireMenu,
// 	inquirePausa,
// 	leerInput,
// 	listadoBorrar,
// 	confirmar,
// 	listadoCheckList
// }

export {
	leerInput,
	inquireMenu,
	inquirePausa,
	listaLugares
};