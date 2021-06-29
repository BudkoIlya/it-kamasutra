import { connect } from 'react-redux';
import MyPosts, { MapDispatchToProps, MapStateToPropsType } from './MyPosts';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';

// Передаём часть state для MyPostsContainer в props'ах
const mapStateToProps = ({ profilePage }: Pick<AppStateType, 'profilePage'>) => ({
  posts: profilePage.posts
});
// Создаётся связь с компонентой MyPosts, создавая новую компоненту(контейнер) содержащую store, которая рендерит MyPosts
const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToProps, object, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
