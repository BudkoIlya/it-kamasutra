import React, { ComponentType, FC } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import Profile from './Profile';
import {
  getUsersProfileThunk,
  savePhotoThunk,
  setStatusThunk,
  updateStatusThunk,
  saveProfileThunk
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    const { userId } = this.props.match.params;
    const prevUserId = prevProps.match.params.userId;
    if (prevUserId !== userId) {
      // debugger; - проверка мой ли выбран профиль либо чей-то другой, при загрузке компонеты должен отображаться мой профиль
      this.refreshProfile();
    }
  }

  refreshProfile = () => {
    const { match, getUsersProfileThunk, setStatusThunk, authorizedUserId } = this.props;
    let { userId } = match.params; // userId произвольное название выставляется в App.ts в <Route path = ''/> приходит ввиде СТРОКИ
    if (!userId) userId = String(authorizedUserId); // если нет в url значения id поумолчанию отображаем 2(в дальнейшем изменим на сой профиль )
    // Авторизируемся и получаем данные этого пользователя в state
    // todo: сервак требует числа, в парамсах приходит строка <Route path='/profile/:userId?'/>
    getUsersProfileThunk(Number(userId));
    setStatusThunk(Number(userId));
  };

  render() {
    const { profile, status, updateStatusThunk, savePhotoThunk } = this.props;
    return (
      <Profile
        savePhoto={savePhotoThunk}
        isOwner={!this.props.match.params.userId} // userId - если есть, то значит я не владелец страницы
        profile={profile}
        status={status}
        updateStatus={updateStatusThunk}
        saveProfile={this.props.saveProfileThunk}
      />
    );
  }
}
const mapStateToProps = ({ profilePage, auth }: AppStateType): mapStateToPropsT => ({
  profile: profilePage.profile,
  status: profilePage.status,
  authorizedUserId: auth.userId,
  isAuth: auth.isAuth
});
export default compose<FC | ComponentType>(
  withAuthRedirect, // hoc для ридеректа
  connect(mapStateToProps, {
    getUsersProfileThunk,
    setStatusThunk,
    updateStatusThunk,
    savePhotoThunk,
    saveProfileThunk
  }),
  withRouter
)(ProfileContainer);

// types
type mapStateToPropsT = {
  profile: ProfileType | null;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type mapDispatchToPropsT = {
  getUsersProfileThunk: (userId: number) => void;
  setStatusThunk: (userId: number) => void;
  updateStatusThunk: (status: string) => void;
  savePhotoThunk: (photo: File) => void;
  saveProfileThunk: (newProfileData: ProfileType) => Promise<void>;
};
type MatchParams = {
  userId: string;
};

type PropsType = mapStateToPropsT & mapDispatchToPropsT & RouteComponentProps<MatchParams>;
