import { GetItemsType, ResponseType, instance } from './api';
import { FilterGetUsersT } from '../redux/users-reducer';

export const usersAPI = {
  getUsers(
    currentPage: number,
    pageSize: number,
    { term, isFriends }: FilterGetUsersT
  ) {
    // здесь обращаемся теперь к instance
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&friend=${isFriends}${
          term === 'all' ? '' : `&term=${term}`
        }`
      )
      .then((res) => res.data);
  },
  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then((res) => res.data);
  },
  unFollow(id: number) {
    return instance
      .delete<ResponseType>(`follow/${id}`)
      .then((res) => res.data);
  },
};
