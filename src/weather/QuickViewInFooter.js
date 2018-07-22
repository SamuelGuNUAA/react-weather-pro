import React, { Component } from 'react';
import CityCondition from './CityCondition';
import '../index.css';

import {FetchWeatherByCity, FetchWeatherByCityForecast} from '../api/weather';

const CityArry=['Melbourne', 'Sydney', 'Gold Coast', 'Wuxi']
export default class CityConditionRoll extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            condition:{},
        };
        this.CityRoll();
    }

    componentDidMount(){
        //default get 'brisbane'
        FetchWeatherByCity(CityArry[CityArry.length-1]).then(data => {
            this.handleConditionData(data);
        }).catch(err => {
            console.log('initial fail'+ err);
        });
    }

    handleConditionData(data){
        console.log('got condition data from api3:',data);
        const condition={
            location:data.display_location.full,
            weather:data.weather,
            temperatureC:data.temp_c + ' °C',
        };
        this.setState({condition});
    }
    
    CityRoll(){
        
        let i=0;
        setInterval(() => {
            FetchWeatherByCity(CityArry[i]).then(data => {
                this.handleConditionData(data);
            }).catch(err => {
                console.log('initial fail'+ err);
            });
            (i === CityArry.length) ? (i=0) : i++;
        }, 1000*6);
    }

    render(){
        return (
            <div className="CityRoll_Location">{this.state.condition.location}: {this.state.condition.weather} {this.state.condition.temperatureC}</div>
        );
    }
}