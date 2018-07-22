import React, { Component } from 'react';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';

import 'whatwg-fetch';

import Forecaster from './Forecaster';
import CityCondition from './CityCondition';
import {FetchWeatherByCity, FetchWeatherByCityForecast} from '../api/weather';
import { FormControlLabel, Switch } from '../../node_modules/@material-ui/core';

const defaultCity = 'brisbane';

class WeatherChannel extends React.Component{

    constructor(props){
        super(props);
        //const forecastItems=[];
        this.state={
            userInput:'',       //input field display
            userInputLast: '',  //record current city in refresh
            desc:'updating...',
            condition:{},
            forecast:[],     
            showDaysSwitch: false,  //default show 5 days, switch to 10 days
            temperatureSwitch: 'C',
        };

        this.change();
    }

    //Refresh current city weather every 5mins
    change(){
        setInterval(() => {
            FetchWeatherByCity(this.state.userInputLast).then(data => {
                this.handleConditionData(data);
            }).catch(err => {
                console.log('initial fail'+ err);
            });
    
            FetchWeatherByCityForecast(this.state.userInputLast, (data) => {this.handleForecastData(data)});
        }, 1000*60*5);
    }

    //communication with child components for temperatureSwitch
    transferTempSwitch(tempSwitch){
        console.log("yy-1",tempSwitch);
        this.setState({
            temperatureSwitch: tempSwitch
        });
    }

    //updating this.state
    handleConditionData(data){
        console.log('got condition data from api1:',data);
        const condition={
            location: data.display_location.full,
            weather: data.weather,
            temperatureC: data.temp_c + ' °',
            temperatureF: data.temp_f + ' °',    
        };
        this.setState({condition});
    }

    handleForecastData(data){
        console.log('got forecast data from api2:',data);
        const forecast = data.forecast.simpleforecast.forecastday;
        console.log("yy-2",forecast);
        
        const forecastValue = forecast.map(item=>{
            return {
                weekday: item.date.weekday, 
                hcelsius: item.high/*.celsius+' °c'*/, 
                lcelsius: item.low/*.celsius+' °c'*/, 
                imgurl: item.icon_url
            }
        });
        
        this.setState({
            desc: data.forecast.txt_forecast.forecastday[0]/*.fcttext_metric*/,
            forecast: forecastValue
        }); 
    }

    handleChange = name => event =>{
        //console.log("SS-1",{[name]: event.target.checked});
        this.setState({ [name]: event.target.checked });
    }

    Load(){
        let cityName=this.state.userInputLast;
        //ensure valid value got, or use default city name
        if(cityName === undefined || cityName === '')
            cityName= defaultCity;
        //GET from API with json data callback
        //FetchWeatherByCity(cityName, (data) => {this.handleConditionData(data)});
        FetchWeatherByCity(cityName).then((json) => {
            this.handleConditionData(json)
        }).catch(err =>{
            console.log('json data return fail', err);
        });

        FetchWeatherByCityForecast(cityName, (data) => {this.handleForecastData(data)});

        //Clear last Input
        this.setState({
            userInput:''
        });
    }
    
    componentDidMount(){
        //default get 'brisbane'
        //Current weather
        FetchWeatherByCity(defaultCity).then(data => {
            this.handleConditionData(data);
        }).catch(err => {
            console.log('initial fail'+ err);
        });
        //Forecast weather by callback
        FetchWeatherByCityForecast(defaultCity, (data) => {this.handleForecastData(data)});
    }

    render(){
        //console.log(typeof(this.state.temperatureSwitch));
        const { classes } = this.props;
        //console.log(this.state.condition.temperatureF);

        return (
            <div>
                <nav>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-simple">City Name</InputLabel>
                        <Input 
                        placeholder="" 
                        inputProps={{'aria-label': 'Description',}} 
                        value ={this.state.userInput}
                        onChange={(e) => this.setState({userInput:e.target.value, userInputLast:e.target.value})} 
                        />    
                    </FormControl>
                
                    <Button 
                        variant="fab" 
                        color="default"
                        aria-label="edit"
                        className={classes.button}
                        onClick={() => {this.Load()}}>
                            <Icon>search_icon</Icon>
                    </Button>

                    <FormControl className="FLL">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.showDaysSwitch}
                                    onChange={this.handleChange('showDaysSwitch')}
                                    value='showDaysSwitch'
                                    color="primary"
                                />
                            }
                            label='Show 10 days'
                        />
                    </FormControl>
                </nav>

                <main>
                    <section id="left">
                        <CityCondition current={this.state.condition} desc={this.state.desc} transferTempSwitch = {tempSwitch => this.transferTempSwitch(tempSwitch)}/>
                    </section>
                    <section id="right">
                        <Forecaster forecast={this.state.forecast} showDaysSwitch={this.state.showDaysSwitch} temperatureSwitch={this.state.temperatureSwitch}/>    
                    </section>
                </main>
            </div>
        );
    }
}
const styles = theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing.unit
    }
  });

WeatherChannel.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(WeatherChannel);
