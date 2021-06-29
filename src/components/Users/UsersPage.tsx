import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/preloader/preloader';
import { getUsersThunkCreator } from '../../redux/users-reducer';
import { getCurrentPage, getIsFetching, getIsFriends, getPageSize, getTerm } from '../../redux/users-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const UsersPage = () => {
  const isFetching = useSelector(getIsFetching);
  const term = useSelector(getTerm);
  const isFriends = useSelector(getIsFriends);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, { term, isFriends }));
  }, []);
  return (
    <>
      <Preloader isFetching={isFetching} />
      <Users
        filterGetUsers={{ term, isFriends }}
        pageSize={pageSize}
        currentPage={currentPage}
        isFetching={isFetching}
      />
    </>
  );
};

export const UserPageAuthRedirect = withAuthRedirect(UsersPage);
