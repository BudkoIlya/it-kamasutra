import React from 'react';
import classes from './Post.module.css';
import { PostsType } from '../../../../types/types';

const Post: React.FC<PostsType> = ({ message, id, likeCounts }) => (
  <div className={classes.item}>
    <div className={classes.message}>
      <div>
        <img
          src="https://i.pinimg.com/originals/2d/0f/50/2d0f50e8e4f6b233c7cf70b4bd36f89c.png"
          alt=""
        />
      </div>
      <p>{message}</p>
    </div>
    <span id={String(id)} className={classes.like}>
      {`Likes : ${likeCounts}`}
    </span>
  </div>
);
export default Post;
