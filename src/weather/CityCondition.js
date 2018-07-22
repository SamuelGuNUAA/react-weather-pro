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
            UnitUp: a, 
            UnitDown: b
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
        //console.log("TT-3",this.props.desc);
        const { temperatureC, temperatureF } = this.props.current;
    
        return( 
            <div>
                <div id="location">{this.props.current.location}</div>
                <div id="weather">{this.props.current.weather}</div>
                <div className="Unit_FlexLayout">
                    <div id="temperature">{(this.state.UnitDown === 'C') ? temperatureC : temperatureF }</div>
                    <div className="Btn_FlexLayout">
                        <div>
                            <button className="unit_btn button_up" onClick={() => {this.UnitSwich(); this.props.transferTempSwitch(this.state.UnitUp)}}>{this.state.UnitUp}</button>
                        </div>
                        <div>
                            <button className="unit_btn button_down">{this.state.UnitDown}</button>
                        </div>
                    </div>
                </div>
                <div id="desc">{(this.state.UnitDown === 'C') ? this.props.desc.fcttext_metric : this.props.desc.fcttext}</div>
            </div>
        );
    }
}

export default CityCondition;