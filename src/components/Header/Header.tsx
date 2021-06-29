import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header: React.FC<PropsType> = ({ isAuth, login, logout }) => (
  <header className={classes.header}>
    <img
      src='https://st3.depositphotos.com/8687680/16290/i/450/depositphotos_162901470-stock-photo-modern-head-logo-sign-of.jpg'
      alt=''
    />
    <div className={classes.loginBlock}>
      {isAuth ? (
        <div>
          {login} -
          <button type='button' onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <NavLink to='/login'>Login</NavLink>
      )}
    </div>
  </header>
);

export default Header;

// Types
export type MapStatePropsT = {
  isAuth: boolean;
  login: string | null;
};
export type MapDispatchPropsT = {
  logout: () => void;
};

type PropsType = MapStatePropsT & MapDispatchPropsT;
