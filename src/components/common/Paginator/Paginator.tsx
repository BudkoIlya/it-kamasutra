import React from 'react';
import { Pagination } from 'antd';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  filter?: any;
  onChange: (...args: any[]) => void;
};

export const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  isFetching,
  filter,
  onChange,
}) => {
  return (
    <div>
      <Pagination
        disabled={isFetching}
        defaultCurrent={1}
        total={totalItemsCount}
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={(page) => onChange(page, filter)}
      />
    </div>
  );
};
