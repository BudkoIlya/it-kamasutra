import React from 'react';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
import { FilterGetUsersT, getUsersThunkCreator } from '../../redux/users-reducer';
import { getTotalUsersCount, getUsers } from '../../redux/users-selectors';

type Props = {
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  filterGetUsers: FilterGetUsersT;
};

export const Users: React.FC<Props> = ({ currentPage, pageSize, isFetching, filterGetUsers: { term, isFriends } }) => {
  // store
  const totalUsersCount = useSelector(getTotalUsersCount);
  const users = useSelector(getUsers);
  // dispatch
  const dispatch = useDispatch();
  const onFilterChanged = (currentPage: number, filter: FilterGetUsersT) => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
  };

  const searchUsersByFilter = ({ searchUsers, friendSelector }: FormikValues) => {
    // при поиске c term всегда должна сбрасываться страница на первую
    onFilterChanged(1, { term: searchUsers, isFriends: friendSelector });
  };
  const resetSearchData = (actions: FormikProps<FiledValues>) => {
    onFilterChanged(1, { term: '', isFriends: 'all' });
    // todo: handleReset - сбрасываем на initialValues, тоесть searchUsers = '' и friendSelector = 'all'
    // actions.handleReset();
    // todo: resetForm - либо прописываем вручную нужные значения
    actions.resetForm({
      values: {
        searchUsers: '',
        friendSelector: 'all'
      }
    });
  };
  return (
    <div>
      <Formik initialValues={{ searchUsers: term, friendSelector: isFriends }} onSubmit={searchUsersByFilter}>
        {actions => (
          <Form>
            <Field type='text' name='searchUsers' placeholder='Search' />
            <Field component='select' name='friendSelector'>
              <option value='all'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <button type='submit' disabled={isFetching}>
              Search
            </button>
            <button type='button' name='reset' onClick={() => resetSearchData(actions)} disabled={isFetching}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
      <Paginator
        filter={{ term, isFriends }}
        isFetching={isFetching}
        currentPage={currentPage}
        onFilterChanged={onFilterChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        portionSize={10}
      />
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

// Types
type FiledValues = {
  searchUsers: FilterGetUsersT['term'];
  friendSelector: FilterGetUsersT['isFriends'];
};
