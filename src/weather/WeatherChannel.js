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
            showDays:'5',
            temperatureSwitchC: 'tc',
        };

        this.change();
    }

    change(){
        setInterval(() => {
            FetchWeatherByCity(this.state.defaultCity).then(data => {
                this.handleConditionData(data);
            }).catch(err => {
                console.log('initial fail'+ err);
            });
    
            FetchWeatherByCityForecast(this.state.defaultCity, (data) => {this.handleForecastData(data)});
        }, 1000*60*5);
    }

    //updating this.state
    handleConditionData(data){
        console.log('got condition data from api1:',data);
        const condition={
            location:data.display_location.full,
            weather:data.weather,
            temperatureC:data.temp_c + ' °',
            temperatureF:data.temp_f + ' °',    
        };
        this.setState({condition});
    }

    handleForecastData(data){
        console.log('got forecast data from api2:',data);
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
        let city2=this.state.userInput;
        if(this.state.userInput === undefined || this.state.userInput === '')
            city2='brisbane';
        //GET from API with json data callback
        //FetchWeatherByCity(city2, (data) => {this.handleConditionData(data)});
        FetchWeatherByCity(city2).then((json) => {
            this.handleConditionData(json)
        }).catch(err =>{
            console.log('json data return fail', err);
        });

        FetchWeatherByCityForecast(this.state.userInput, (data) => {this.handleForecastData(data)});

        //Clear last Input
        this.setState({
            userInput:''
        });
    }
    
    componentDidMount(){
        //default get 'brisbane'
        FetchWeatherByCity(this.state.defaultCity).then(data => {
            this.handleConditionData(data);
        }).catch(err => {
            console.log('initial fail'+ err);
        });

        FetchWeatherByCityForecast(this.state.defaultCity, (data) => {this.handleForecastData(data)});
    }

    render(){
        console.log(typeof(this.state.temperatureSwitchC));
        //console.log(this.state.condition.temperatureF);
        //<div className="radioLocation" onChange={() => this.setState({temperatureSwitchC: !this.state.temperatureSwitchC})}>
        return (
            <div>
                <nav>
                    <input value ={this.state.userInput} 
                            onChange={(e) => this.setState({userInput:e.target.value})} />
                    <button onClick={() => {this.Load()}}>Search</button>

                    <div className="radioLocation">
                        <div className="test1" onChange={(e) => this.setState({showDays: e.target.value})}>
                            <input className="radioWidth FLL" type="radio" defaultChecked={this.state.showDays === '5'} value='5' name='showDays' />
                            <p className="FLL">Show 5 Days</p>
                            <input className="radioWidth FLL" type="radio" defaultChecked={this.state.showDays === '10'} value='10' name='showDays' />
                            <p className="FLL">Show 10 Days</p>
                        </div>
                        <div className="test1" onChange={(e) => this.setState({temperatureSwitchC: e.target.value})}>
                            <input className="radioWidth FLL" type="radio" defaultChecked={this.state.temperatureSwitchC === 'tc'} value='tc' name='temperSwitch' />
                            <p className="FLL">°C</p>
                            <input className="radioWidth FLL" type="radio" defaultChecked={this.state.temperatureSwitchC === 'tf'} value='tf' name='temperSwitch' />
                            <p className="FLL">°F</p>
                        </div>
                    </div>
                </nav>

                <main>
                    <section id="left">
                        <CityCondition current={this.state.condition} desc={this.state.desc} temper={this.state.temperatureSwitchC=='tc' ? this.state.condition.temperatureC : this.state.condition.temperatureF} />
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