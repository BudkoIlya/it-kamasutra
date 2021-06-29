import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Users.module.css';
import userPhoto from '../../assets/img/user.png';
import { UserType } from '../../types/types';
import { followThunkCreator, unFollowThunkCreator } from '../../redux/users-reducer';
import { getFollowingInProgress } from '../../redux/users-selectors';

// types
type PropsType = {
  user: UserType;
};

export const User: React.FC<PropsType> = ({ user }) => {
  const dispatch = useDispatch();
  const follow = (userId: number) => dispatch(followThunkCreator(userId));
  const unFollow = (userId: number) => dispatch(unFollowThunkCreator(userId));
  const followingInProgress = useSelector(getFollowingInProgress);
  return (
    <div key={user.id} className={classes.users}>
      <div>
        <div>
          {/* todo: Очень важное замечание - здесь в путь прокидывается id которое потом достаем с помощью params */}
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={classes.photo}
              alt='preloader'
            />
          </NavLink>
        </div>
        {user.followed ? (
          // Если подписан
          <button
            type='button'
            // some возвращает true либо false
            disabled={followingInProgress.some(
              id => id === user.id // вернёт true только в том случае если isFetching = true,
              // isFetching передаётся при клике на подписку/отписку
            )}
            onClick={() => {
              unFollow(user.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          // Если не подписан
          <button
            type='button'
            disabled={followingInProgress.some(id => id === user.id)}
            onClick={() => {
              follow(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div>
        <p>{user.name}</p>
        <p>user.status</p>
        <p>user.location.city</p>
        <p>user.location.country</p>
      </div>
    </div>
  );
};
