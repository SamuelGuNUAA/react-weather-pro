import React from 'react';

function DailyItem(props){
	const day=props.day;
	return (
		<div>
			<span>{day.weekday}</span>
			<span><img src={day.imgurl} /></span>
			<span>{day.hcelsius}</span>
			<span>{day.lcelsius}</span>
		</div>
	)
}

export default function Forecaster(props){
		//console.log(props.forecast);
		let newForecast=props.forecast.slice(0,props.showDays ? 10 : 7);
		//console.log(newForecast);
        return (			
			newForecast.map(
				(value, index) => <DailyItem key={index} day={value} />
			)
        )
}

