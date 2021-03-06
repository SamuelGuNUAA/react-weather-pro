import React from 'react';

import 'whatwg-fetch';

const CONDITION_BASE_URL = 'https://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/';
const FORECAST_BASE_URL = 'https://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';


export function FetchWeatherByCity(cityName){

    return  fetch(`${CONDITION_BASE_URL}${cityName}.json`).then(res=>{
                return res.json();
            }).then(json=>{
                //console.log('parsed json', json.current_observation)
                return json.current_observation;  
            }).catch(ex=>{
                console.log('parsing failed', ex)
            })
}

export function FetchWeatherByCityForecast(cityName, callback){
    
    let weatherForecastURL = `${FORECAST_BASE_URL}${cityName}.json`;

    fetch(weatherForecastURL).then(res=>{
        //console.log(res.json());
        return res.json();
    }).then(json=>{
        //console.log('parsed json', json.forecast.txt_forecast.forecastday[0].fcttext_metric)
        callback(json);
           
    }).catch(ex=>{
        console.log('parsing failed', ex)
    });
}