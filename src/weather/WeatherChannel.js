import React, { Component } from 'react';

import 'whatwg-fetch';

import Forecaster from './Forecaster';
import CityCondition from './CityCondition';
import {FetchWeatherByCity, FetchWeatherByCityForecast} from '../api/weather';


class WeatherChannel extends React.Component{

    constructor(props){
        super(props);
        //const forecastItems=[];
        this.state={
            defaultCity:'brisbane',
            userInput:'',
            desc:'updating...',
            condition:{},
            forecast:[],
            showDays:true
        };
    }

    //updating this.state
    handleConditionData(data){
        console.log('got condition data from api:',data);
        const condition={
            location:data.display_location.full,
            weather:data.weather,
            temperature:data.temp_c + ' °c'            
        };
        this.setState({condition});
    }

    handleForecastData(data){
        console.log('got forecast data from api:',data);
        const forecast = data.forecast.simpleforecast.forecastday;
        //console.log(forecast);
        
        const forecastValue = forecast.map(item=>{
            return {
                weekday:item.date.weekday, 
                hcelsius:item.high.celsius+' °c', 
                lcelsius:item.low.celsius+' °c', 
                imgurl:item.icon_url
            }
        });
        
        this.setState({
            desc:data.forecast.txt_forecast.forecastday[0].fcttext_metric,
            forecast:forecastValue
        }); 
    }



    Load(){
        //GET from API with json data callback
        FetchWeatherByCity(this.state.userInput, (data) => {this.handleConditionData(data)});
        FetchWeatherByCityForecast(this.state.userInput, (data) => {this.handleForecastData(data)});

        //Clear last Input
        this.setState({
            userInput:''
        });
    }
    
    ShowDays(){
        this.setState({
            showDays:!this.state.showDays
        });
    }

    componentDidMount(){
        //default get 'brisbane'
        FetchWeatherByCity(this.state.defaultCity, (data) => {this.handleConditionData(data)});
        FetchWeatherByCityForecast(this.state.defaultCity, (data) => {this.handleForecastData(data)});
    }

    render(){

        return (
            <div>
                <nav>
                    <input value ={this.state.userInput} 
                            onChange={(e) => this.setState({userInput:e.target.value})} />
                    <button onClick={() => {this.Load()}}>Load</button>
                    <button onClick={() => {this.ShowDays()}}>{this.state.showDays ? '5 days' : '10 days'}</button>
                </nav>

                <main>
                    <section id="left">
                        <CityCondition current={this.state.condition} desc={this.state.desc}/>
                    </section>
                    <section id="right">
                        <Forecaster forecast={this.state.forecast} showDays={this.state.showDays}/>    
                    </section>
                </main>
            </div>
        );
    }
}

export default WeatherChannel;