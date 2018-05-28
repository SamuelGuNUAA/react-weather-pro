import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import Header from './weather/Header';
import Footer from './weather/Footer';
import WeatherChannel from './weather/WeatherChannel';
//import './index.css';


export default function App(props) {

    return (
      <div className="App">
        <div id="wrapper">
          <Header />
          <WeatherChannel />
          <Footer />
        </div>
      </div>
    );
}

