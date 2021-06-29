import React, { useState } from 'react';
import cn from 'classnames';
import classes from './Paginator.module.css';
import { FilterGetUsersT } from '../../../redux/users-reducer';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onFilterChanged: (page: number, payload: FilterGetUsersT) => void;
  portionSize?: number;
  isFetching: boolean;
  filter: FilterGetUsersT;
};

export const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onFilterChanged,
  portionSize = 10,
  isFetching,
  filter
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = [];
  for (let i = 1, count = pagesCount; i <= count; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.paginator}>
      {portionNumber > 1 && (
        <button
          disabled={isFetching}
          type='button'
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page, i) => (
          <div key={String(i)}>
            <span
              className={cn(classes.page, {
                [classes.selectedPage]: currentPage === page
              })}
              onClick={() => {
                onFilterChanged(page, filter);
              }}
            >
              {page}
            </span>
          </div>
        ))}
      {portionCount > portionNumber && (
        <button
          disabled={isFetching}
          type='button'
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};
