import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { required, requiredMaxLength } from '../../../utils/validators/validators';
import { CreateField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls';
import { PostsType } from '../../../types/types';

const maxLength = requiredMaxLength(30);

// оптимизация приложения React.memo(внутри реализован аналог классового метода ShouldComponentUpdate)
const MyPosts: React.FC<PropsType> = React.memo(({ posts, addPost }) => {
  const postsElements = posts.map(p => <Post message={p.message} likeCounts={p.likeCounts} key={p.id} id={p.id} />);

  const onAddPost = (formData: LoginFormValuesType) => {
    addPost(formData.newPostBody);
  };
  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3>
      <div>
        {/* onSubmit={onAddPost} - автоматически прокидывает этот сабмит в handleSubmit(обязательно имя onSubmit) */}
        <AddMessagePostRedux onSubmit={onAddPost} />
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});

const AddMessagePost: React.FC<InjectedFormProps<LoginFormValuesType>> = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>{CreateField<LoginFormValuesTypeKeys>('add post', 'newPostBody', [required, maxLength], Textarea)}</div>
    <div>
      <button type='submit'>Add post</button>
    </div>
  </form>
);

const AddMessagePostRedux = reduxForm<LoginFormValuesType>({ form: 'addPost' })(AddMessagePost);

export default MyPosts;

// types
type LoginFormValuesType = {
  newPostBody: PostsType;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export type MapStateToPropsType = {
  posts: Array<PostsType>;
};
export type MapDispatchToProps = {
  addPost: (newPostBody: PostsType) => void;
};
type PropsType = MapStateToPropsType & MapDispatchToProps;
