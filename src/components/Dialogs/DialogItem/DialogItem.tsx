import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Dialogs.module.css';
import { MessagesType } from '../../../redux/dialogs-reducer';

const DialogItem: React.FC<MessagesType> = ({ id, name }) => {
  const path = `/dialogs/${id}`;
  return (
    <div>
      {/* to(для) - для такого-то пути применяем  - activeClassName  */}
      <NavLink
        exact
        className={classes.dialog}
        to={path}
        activeClassName={classes.active}
      >
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
