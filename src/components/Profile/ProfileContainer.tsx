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
  saveProfileThunk,
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    // userId прокидывается в params с помощью <NavLink to={`/profile/${user.id}`}> в User
    const {
      match: {
        params: { userId },
      },
    } = this.props;
    const prevUserId = prevProps.match.params.userId;
    if (prevUserId !== userId) {
      // debugger; - проверка мой ли выбран профиль либо чей-то другой, при загрузке компонеты должен отображаться мой профиль
      this.refreshProfile();
    }
  }

  refreshProfile = () => {
    const { match, getUsersProfile, setStatus, authorizedUserId } = this.props;
    let { userId } = match.params; // userId произвольное название выставляется в App.ts в <Route path = ''/> приходит ввиде СТРОКИ
    if (!userId) userId = String(authorizedUserId); // если нет в url значения id поумолчанию отображаем 2(в дальнейшем изменим на сой профиль )
    // Авторизируемся и получаем данные этого пользователя в state
    // todo: сервак требует числа, в парамсах приходит строка <Route path='/profile/:userId?'/>
    getUsersProfile(Number(userId));
    setStatus(Number(userId));
  };

  render() {
    const { profile, status, updateStatus, savePhoto, match, saveProfile } =
      this.props;
    return (
      <Profile
        savePhoto={savePhoto}
        isOwner={!match.params.userId} // userId - если есть, то значит я не владелец страницы
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        saveProfile={saveProfile}
      />
    );
  }
}
const mapStateToProps = ({
  profilePage,
  auth,
}: AppStateType): MapStateToPropsT => ({
  profile: profilePage.profile,
  status: profilePage.status,
  authorizedUserId: auth.userId,
  isAuth: auth.isAuth,
});
export default compose<FC | ComponentType>(
  withAuthRedirect, // hoc для ридеректа
  connect(mapStateToProps, {
    getUsersProfile: getUsersProfileThunk,
    setStatus: setStatusThunk,
    updateStatus: updateStatusThunk,
    savePhoto: savePhotoThunk,
    saveProfile: saveProfileThunk,
  }),
  withRouter
)(ProfileContainer);

// types
type MapStateToPropsT = {
  profile: ProfileType | null;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchToPropsT = {
  getUsersProfile: (userId: number) => void;
  setStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (newProfileData: ProfileType) => Promise<void>;
};
type MatchParams = {
  userId: string;
};

type PropsType = MapStateToPropsT &
  MapDispatchToPropsT &
  RouteComponentProps<MatchParams>;
