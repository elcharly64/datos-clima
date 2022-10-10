
import fs, { existsSync } from 'fs';

import axios from "axios";
import { inquirePausa } from "../helpers/inquirer.js";
class Buscar{
    
    ruta = './DB/datos.json';
    Historial = [];

    constructor(){
        //Nada todavia
        this.leerDB();
    }

    get parametros(){
        return {
            'access_token' : process.env.Mapbox,
            'limit': 5,
            'language': 'es'
        }
    }

    wheatherParams(long,lat){
        return {
            'appid' : process.env.OpenWeather,
            'units': 'metric',
            'lang': 'es',
            lon : long,
            lat : lat
        }
    }

    async buscarLugar(lugar=''){
        const instancia = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.parametros
        });
        try {
            const resp = await instancia.get();
            return resp.data.features;
            
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    async buscarWeather(long=0.0,lat=0.0){
        
        const instancia = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: this.wheatherParams(long,lat)
        });
        try {
            const resp = await instancia.get();
            this.guardarDB();
            return {
                'descripcion': resp.data.weather[0].description,
                'min': resp.data.main.temp_min,
                'max': resp.data.main.temp_max,
                'temp': resp.data.main.temp,
            };
            
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    async agregarHistorial(lugar = ''){
        if(this.Historial.includes(lugar.toLowerCase())) return;
        this.Historial.unshift(lugar);
        if(this.Historial.length>5) this.Historial.pop();
    }

    guardarDB(){
        const payload = {
            Historial: this.Historial
        };
        fs.writeFileSync(this.ruta,JSON.stringify(payload));
    }

    async leerDB(){
        if(existsSync(this.ruta)){
            const data = fs.readFileSync(this.ruta,{encoding:'utf-8'});
            const info = JSON.parse(data);
            this.Historial = info.Historial;
        }
    }

    capitalizarTitulo(frases = []){
        const resultado = 
            frases.map(frase =>{
                let farr = frase.split(' ');
                farr = 
                farr.map(t=>{
                    return t.substring(0,1).toUpperCase()+t.substring(1).toLowerCase()
                });
                return farr.join(' ');
            });
        return resultado;
    }
}





export{Buscar};