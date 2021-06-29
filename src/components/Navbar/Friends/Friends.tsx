import React from 'react';
import classes from './Friends.module.css';

const Friends = (props: any) => (
  // debugger;
  <div className={classes.friend}>
    <img src={props.src} alt='' className={classes.logo} />
    <p>{props.name}</p>
  </div>
);
export default Friends;
