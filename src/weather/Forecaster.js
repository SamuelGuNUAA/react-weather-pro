import React from 'react';

function DailyItem(props){
	const day=props.day;
	return (
		<div>
			<span>{day.weekday}</span>
			<span><img src={day.imgurl} /></span>
			<span>{(props.temperatureSwitch === 'C') ? `${day.hcelsius.celsius} °c` : `${day.hcelsius.fahrenheit} °f`}</span>
			<span>{(props.temperatureSwitch === 'C') ? `${day.lcelsius.celsius} °c` : `${day.lcelsius.fahrenheit} °f`}</span>
		</div>
	)
}

export default function Forecaster(props){
		//console.log(props.forecast);
		let newForecast=props.forecast.slice(0,(props.showDaysSwitch) ? 10 : 5);
		//console.log(newForecast);
        return (			
			newForecast.map(
				(value, index) => <DailyItem key={index} day={value} temperatureSwitch={props.temperatureSwitch}/>
			)
        )
}

