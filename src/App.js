import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Header from './Header';
import Footer from './Footer';
import WeatherChannel from './WeatherChannel';
//import './index.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <body>
          <div id="wrapper">
        <Header />

        <WeatherChannel />
        <Footer />
          </div>
        </body>
      </div>
    );
  }
}

export default App;
