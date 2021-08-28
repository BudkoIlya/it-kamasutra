import React from 'react';
import ProfileInfo, {
  ProfileInfoPropsT,
} from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile: React.FC<ProfileInfoPropsT> = (props) => (
  <div>
    <ProfileInfo {...props} />
    <MyPostsContainer />
  </div>
);
export default Profile;
