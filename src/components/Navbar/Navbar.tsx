import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import Friends from './Friends/Friends';
import { FriendsType } from '../../redux/friends-reducer';

type PropsType = {
  friends: Array<FriendsType>;
};

const Navbar: React.FC<PropsType> = ({ friends }) => {
  const friendsElements = friends.map((f: FriendsType) => <Friends name={f.name} src={f.logo} key={f.id} />);
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' activeClassName={classes.active}>
          Messages
        </NavLink>
      </div>
      <div className={`${classes.item}`}>
        <NavLink to='/users' activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <div>
        <p className={classes.friendsTitle}>Friends</p>
        <div className={classes.friends}>{friendsElements}</div>
      </div>
      {/* <div className={classes.item}>
                <NavLink to="/music" activeClassName="active">Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/setting" activeClassName="active">Settings</NavLink>
            </div> */}
    </nav>
  );
};

export default Navbar;
