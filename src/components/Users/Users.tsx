import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
import {
  FilterGetUsersT,
  getUsersThunkCreator,
} from '../../redux/users-reducer';
import { getTotalUsersCount, getUsers } from '../../redux/selectors';
import { Forms } from './UsersSearchForm';

type Props = {
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  filterGetUsers: FilterGetUsersT;
};

export const Users: React.FC<Props> = ({
  currentPage,
  pageSize,
  isFetching,
  filterGetUsers: { isFriends, term },
}) => {
  // store
  const totalUsersCount = useSelector(getTotalUsersCount);
  const users = useSelector(getUsers);
  // dispatch
  const dispatch = useDispatch();
  const onFilterChanged = (page: number, filter: FilterGetUsersT) => {
    dispatch(getUsersThunkCreator(page, pageSize, filter));
  };
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    isFriends: StringParam,
    term: StringParam,
  });
  useEffect(() => {
    const queryTerm = query.term ? query.term : '';
    const queryIsFriends = query.isFriends
      ? (query.isFriends as FilterGetUsersT['isFriends'])
      : 'all';
    dispatch(
      getUsersThunkCreator(query.page as number, pageSize, {
        term: queryTerm,
        isFriends: queryIsFriends,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuery({
      page: currentPage,
      isFriends,
      term,
    });
  }, [term, currentPage, isFriends, setQuery]);

  return (
    <div>
      <Forms
        setQuery={setQuery}
        term={term}
        isFriends={isFriends}
        isFetching={isFetching}
        onFilterChanged={onFilterChanged}
      />
      <Paginator
        filter={{ term, isFriends }}
        isFetching={isFetching}
        currentPage={currentPage}
        onChange={onFilterChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};
