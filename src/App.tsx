import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { NavTabs } from "./components/nav-taps/NavTabs";
import {useStyles}from "./appStyle"


function App() {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
    <div
      className={classes.main}
    >
      <CssBaseline />
      <NavTabs  />
     
    </div>
    </div>
  );
}

export default App;
