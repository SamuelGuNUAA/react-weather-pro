import React, { Component } from 'react';
import CityCondition from './CityCondition';
import '../index.css';

import {FetchWeatherByCity, FetchWeatherByCityForecast} from '../api/weather';

function CityConditionRoll(props){
    console.log(props.current);
    return(
            <div className="CityRoll_Location">{props.current.location}: {props.current.weather} {props.current.temperatureC}</div>
    );
}

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            condition:{},
        };
        this.CityRoll();
    }

    componentDidMount(){
        //default get 'brisbane'
        FetchWeatherByCity('Brisbane').then(data => {
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
        const CityArry=['Beijing', 'Gold Coast', 'Wuxi']
        let i=0;
        setInterval(() => {
            FetchWeatherByCity(CityArry[i]).then(data => {
                this.handleConditionData(data);
            }).catch(err => {
                console.log('initial fail'+ err);
            });
            (i===2) ? (i=0) : i++;
        }, 1000*5);
    }

    render(){
        return (
            <footer>
                <p>Fullstack Web Dev 101  Samuel Gu</p>
                <CityConditionRoll current={this.state.condition}/>
            </footer>
        );
    }
}

export default Footer;