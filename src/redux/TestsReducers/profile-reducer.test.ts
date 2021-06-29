import profileReducer, { actions } from '../profile-reducer';

// 1. test data
const state = {
  posts: [
    { id: 1, message: 'Hi', likeCounts: 21 },
    { id: 2, message: 'How a u', likeCounts: 22 },
    { id: 3, message: 'Yo', likeCounts: 23 }
  ],
  profile: null,
  status: ''
};

const newPost = {
  id: 100,
  message: 'new post',
  likeCounts: 10
};

it('length of posts should be increase', () => {
  // 2. action
  const action = actions.addPostActionCreator(newPost);
  // 3. expectation
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});

it('message should be correct', () => {
  // 2. action
  const action = actions.addPostActionCreator(newPost);
  // 3. expectation
  const newState = profileReducer(state, action);
  expect(newState.posts[0].message).toBe(newPost);
});

it('after delete length of posts should be decrease', () => {
  // 2. action
  const action = actions.deletePost(1);
  // 3. expectation
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});
