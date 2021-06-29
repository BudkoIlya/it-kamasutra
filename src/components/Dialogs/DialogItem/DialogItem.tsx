import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Dialogs.module.css';
import { MessagesType } from '../../../redux/dialogs-reducer';

const DialogItem: React.FC<MessagesType> = props => {
  const path = `/dialogs/${props.id}`;
  return (
    <div>
      {/* to(для) - для такого-то пути применяем  - activeClassName  */}
      <NavLink className={classes.dialog} to={path} activeClassName={classes.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
