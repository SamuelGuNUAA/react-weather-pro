import React from 'react';

export default function CityCondition (props){
    console.log(props.current.location);
    return( 
        <div>
	        <div id="location">{props.current.location}</div>
	        <div id="weather">{props.current.weather}</div>
	        <div id="temperature">{props.current.temperature}</div>
            <div id="desc">{props.desc}</div>
        </div>
    )
}
