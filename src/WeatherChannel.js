import React, { Component } from 'react';

import 'whatwg-fetch';

import Forecaster from './Forecaster';
import CityCondition from './CityCondition';

class WeatherChannel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInput:'',
            condition:{
                location:'Current City',
                weather:'Current Conditions',
                temperature:'updating...'
                
            },
            forecast:{
                desc:'updating...',
                weektable:[
                    {
                        weekday:'updating...',
                        hcelsius:'updating...',
                        lcelsius:'updating...'
                    },
                    {
                        weekday:'updating...',
                        hcelsius:'updating...',
                        lcelsius:'updating...'
                    },
                    {
                        weekday:'updating...',
                        hcelsius:'updating...',
                        lcelsius:'updating...'
                    },
                    {
                        weekday:'updating...',
                        hcelsius:'updating...',
                        lcelsius:'updating...'
                    },
                    {
                        weekday:'updating...',
                        hcelsius:'updating...',
                        lcelsius:'updating...'
                    }
                ]
            }
        };
    }

    /*
    queryWeatherByCity(city){
        let weatherConditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/'+city+'.json';
        let oAjax = new XMLHttpRequest();
        oAjax.open('GET', weatherConditionURL, true);
        oAjax.send();
        oAjax.onload = function(){
            if(oAjax.status===200){
                //console.log(oAjax.responseText);
                let json=JSON.parse(oAjax.responseText);
                console.log(json);
                if(json.response.error){
                    alert(json.response.error.description);
                    //this.Load();
                }else{
                    this.setState({
                        condition:{
                            location:json.current_observation.display_location.full,
                            weather:json.current_observation.weather,
                            temperature:json.current_observation.temp_c + ' °c'
                        }
                    });
                }
            }else{
                alert(oAjax.status);
            }
        }.bind(this);
    }
    */
    FetchWeatherByCityForecast(cityName){
        let weatherForecastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/'+cityName+'.json';
    
        fetch(weatherForecastURL).then(res=>{
            //console.log(res.json());
            return res.json();
        }).then(json=>{
            console.log('parsed json', json.forecast.txt_forecast.forecastday[0].fcttext_metric)

            this.setState({
                //userInput:'bb',
                forecast:{
                    

                    desc:json.forecast.txt_forecast.forecastday[0].fcttext_metric,

                    weektable:[
                        {
                            weekday : json.forecast.simpleforecast.forecastday[1].date.weekday,
                            hcelsius : json.forecast.simpleforecast.forecastday[1].high.celsius + ' °c',
                            lcelsius : json.forecast.simpleforecast.forecastday[1].low.celsius + ' °c',
                            imgurl : json.forecast.simpleforecast.forecastday[1].icon_url
                        },
                        {
                            weekday : json.forecast.simpleforecast.forecastday[2].date.weekday,
                            hcelsius : json.forecast.simpleforecast.forecastday[2].high.celsius + ' °c',
                            lcelsius : json.forecast.simpleforecast.forecastday[2].low.celsius + ' °c',
                            imgurl : json.forecast.simpleforecast.forecastday[2].icon_url
                        },
                        {
                            weekday : json.forecast.simpleforecast.forecastday[3].date.weekday,
                            hcelsius : json.forecast.simpleforecast.forecastday[3].high.celsius + ' °c',
                            lcelsius : json.forecast.simpleforecast.forecastday[3].low.celsius + ' °c',
                            imgurl : json.forecast.simpleforecast.forecastday[3].icon_url
                        },
                        {
                            weekday : json.forecast.simpleforecast.forecastday[4].date.weekday,
                            hcelsius : json.forecast.simpleforecast.forecastday[4].high.celsius + ' °c',
                            lcelsius : json.forecast.simpleforecast.forecastday[4].low.celsius + ' °c',
                            imgurl : json.forecast.simpleforecast.forecastday[4].icon_url
                        },
                        {
                            weekday : json.forecast.simpleforecast.forecastday[5].date.weekday,
                            hcelsius : json.forecast.simpleforecast.forecastday[5].high.celsius + ' °c',
                            lcelsius : json.forecast.simpleforecast.forecastday[5].low.celsius + ' °c',
                            imgurl : json.forecast.simpleforecast.forecastday[5].icon_url
                        }
                    ]
/*
	document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.celsius + '';
	var imgPath = fObj.forecast.simpleforecast.forecastday[1].icon_url
	document.getElementById('r1c2').src = imgPath;
	


   */ 
                }
            });            
        }).catch(ex=>{
            console.log('parsing failed', ex)
        });
    }

    FetchWeatherByCity(cityName){

        let weatherConditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/'+cityName+'.json';
    
        fetch(weatherConditionURL).then(res=>{
            //console.log(res.json());
            return res.json();
        }).then(json=>{
            console.log('parsed json', json.current_observation.display_location.full)

            this.setState({
                //userInput:'bb',
                condition:{
                    
                    location:json.current_observation.display_location.full,
                    weather:json.current_observation.weather,
                    temperature:json.current_observation.temp_c + ' °c'
                }
            });            
        }).catch(ex=>{
            console.log('parsing failed', ex)
        });
    }

    Load(){

        //let cityName=this.refs.city;
        let city1=this.refs.city.value;
        
        this.FetchWeatherByCity(city1);
        this.FetchWeatherByCityForecast(city1);
        /*
        console.log(this.state.userInput);
        this.setState({
            userInput:'bb'
        });
        console.log(this.state.userInput);
        */
     }
    
    componentDidMount(){
        this.FetchWeatherByCity('brisbane');
        this.FetchWeatherByCityForecast('brisbane');
    }

    render(){
        return (
            <div>
                <nav>
                    <input type='text' defaultValue ={this.state.userInput} ref='city' />
                    <button onClick={this.Load.bind(this)}>Load</button>
                </nav>

                <main>
                    <CityCondition current={this.state.condition} forecast={this.state.forecast}/>
                    <Forecaster forecast={this.state.forecast}/>
                </main>
            </div>
        );
    }
}

export default WeatherChannel;