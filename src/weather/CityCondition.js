import React, { Component } from 'react';

class CityCondition extends React.Component{
    constructor(props){
        super(props);
        this.state={
            UnitUp: 'F',
            UnitDown: 'C',
        };
        
    }

    UnitSwich(){
        let a='F', b='C';
        console.log(this.state.UnitUp);
        
        if(this.state.UnitUp === 'F'){
            a='C';
            b='F';
        }
        this.setState({
            UnitUp:a, 
            UnitDown:b
        });
        
    }
    /*
    componentDidUpdate(){
        console.log(this.props.temper+'44');
        //console.log(this.props.current.temperatureF);
        this.setState({showTemper: (this.props.temper ? 11 : 22)});
    }
    */
    render(){
        //console.log(this.props.temper);
        
    
    return( 
        <div>
	        <div id="location">{this.props.current.location}</div>
	        <div id="weather">{this.props.current.weather}</div>
            <div className="Unit_FlexLayout">
	            <div id="temperature">{this.props.temper}</div>
                <div className="Btn_FlexLayout">
                    <div>
                    <button className="unit_btn button_up" onClick={() => this.UnitSwich()}>{this.state.UnitUp}</button>
                    </div>
                    <div>
                    <button className="unit_btn button_down">{this.state.UnitDown}</button>
                    </div>
                </div>
            </div>
            <div id="desc">{this.props.desc}</div>
        </div>
    );
    }
}

export default CityCondition;