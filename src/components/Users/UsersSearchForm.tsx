import React from 'react';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { SetQuery } from 'use-query-params';
import { FilterGetUsersT } from '../../redux/users-reducer';

export const Forms: React.FC<Props> = ({ term, isFriends, isFetching, setQuery, onFilterChanged }) => {
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
    setQuery({
      page: 1,
      isFriends: 'all',
      term: ''
    });
  };

  return (
    <Formik
      enableReinitialize // Control whether Formik should reset the form if initialValues changes
      initialValues={{ searchUsers: term, friendSelector: isFriends }}
      onSubmit={searchUsersByFilter}
    >
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
  );
};

// Types
type Props = {
  term: FilterGetUsersT['term'];
  isFriends: FilterGetUsersT['isFriends'];
  isFetching: boolean;
  setQuery: SetQuery<any>;
  onFilterChanged: (currentPage: number, filter: FilterGetUsersT) => void;
};

type FiledValues = {
  searchUsers: FilterGetUsersT['term'];
  friendSelector: FilterGetUsersT['isFriends'];
};
