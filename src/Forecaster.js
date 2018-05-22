import React, { Component } from 'react';

class Forecaster extends React.Component{

    render(){

        return (
            <section id="right">

                <div>
	                <span id="r1c1">{this.props.forecast.weektable[0].weekday}</span>
	                <span> <img id="r1c2" src={this.props.forecast.weektable[0].imgurl} /></span>
	                <span id="r1c3">{this.props.forecast.weektable[0].hcelsius}</span>
	                <span id="r1c4">{this.props.forecast.weektable[0].lcelsius}</span>
                </div>	
                <div>
	                <span id="r2c1">{this.props.forecast.weektable[1].weekday}</span>
	                <span> <img id="r2c2" src={this.props.forecast.weektable[1].imgurl} /></span>
	                <span id="r2c3">{this.props.forecast.weektable[1].hcelsius}</span>
	                <span id="r2c4">{this.props.forecast.weektable[1].lcelsius}</span>
                </div>	
                <div>
	                <span id="r3c1">{this.props.forecast.weektable[2].weekday}</span>
	                <span> <img id="r3c2" src={this.props.forecast.weektable[2].imgurl} /></span>
	                <span id="r3c3">{this.props.forecast.weektable[2].hcelsius}</span>
	                <span id="r3c4">{this.props.forecast.weektable[2].lcelsius}</span>
                </div>	
                <div>
	                <span id="r4c1">{this.props.forecast.weektable[3].weekday}</span>
	                <span> <img id="r4c2" src={this.props.forecast.weektable[3].imgurl} /></span>
	                <span id="r4c3">{this.props.forecast.weektable[3].hcelsius}</span>
	                <span id="r4c4">{this.props.forecast.weektable[3].lcelsius}</span>
                </div>	
                <div>
	                <span id="r5c1">{this.props.forecast.weektable[4].weekday}</span>
	                <span> <img id="r5c2" src={this.props.forecast.weektable[4].imgurl} /></span>
	                <span id="r5c3">{this.props.forecast.weektable[4].hcelsius}</span>
	                <span id="r5c4">{this.props.forecast.weektable[4].lcelsius}</span>
                </div>	
            </section>
        );
    }
}

export default Forecaster;