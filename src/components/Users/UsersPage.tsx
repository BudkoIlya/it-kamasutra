import React from 'react';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/preloader/preloader';
import { getCurrentPage, getIsFetching, getIsFriends, getPageSize, getTerm } from '../../redux/selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const UsersPage = () => {
  const isFetching = useSelector(getIsFetching);
  const term = useSelector(getTerm);
  const isFriends = useSelector(getIsFriends);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
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
