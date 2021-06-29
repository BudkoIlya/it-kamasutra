import { actions, followThunkCreator, unFollowThunkCreator } from '../../users-reducer';
import { usersAPI } from '../../../api/users-api';
import { ResponseType, ResultCodesEnum } from '../../../api/api';

jest.mock('../../../api/users-api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success
};
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
// сброс диспатча и стэйта перед каждой функцией
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});
// userAPIMock.follow.mockResolvedValue(result);
test('success follow thunk', async () => {
  userAPIMock.follow.mockResolvedValue(result);
  const thunk = followThunkCreator(1);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgressCR(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followCreator(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgressCR(false, 1));
});
test('success unFollow thunk', async () => {
  userAPIMock.unFollow.mockResolvedValue(result);
  const thunk = unFollowThunkCreator(1);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgressCR(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowCreator(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgressCR(false, 1));
});
