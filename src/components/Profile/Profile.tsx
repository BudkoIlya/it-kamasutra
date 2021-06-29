import React from 'react';
import ProfileInfo, { ProfileInfoPropsT } from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props: ProfileInfoPropsT) => (
  <div>
    <ProfileInfo {...props} />
    <MyPostsContainer />
  </div>
);
export default Profile;
