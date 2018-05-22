import React, { Component } from 'react';

class CityCondition extends React.Component{

    render(){
        return(

            <section id="left">
	            <div id="location">{this.props.current.location}</div>
	            <div id="weather">{this.props.current.weather}</div>
	            <div id="temperature">{this.props.current.temperature}</div>
                <div id="desc">{this.props.forecast.desc}</div>
            </section>
        );
    }
}

export default CityCondition;