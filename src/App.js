import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import './App.css';
import Header from './App/Header';
import Footer from './App/Footer';

//import './index.css';
import green from '@material-ui/core/colors/green';

import Content from './App/Content';

const primary = green[100];
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});


function App(props) {
  const { classes } = props;
    return (
      <div className="App">
        <div id="wrapper">
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

