import React from 'react';
import { connect } from 'react-redux';
import Header, { MapStatePropsT, MapDispatchPropsT } from './Header';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

const HeaderContainer: React.FC<MapStatePropsT & MapDispatchPropsT> = props => <Header {...props} />;

const mapStateToProps = ({ auth }: AppStateType) => ({
  isAuth: auth.isAuth,
  login: auth.login
});
export default connect<MapStatePropsT, MapDispatchPropsT, object, AppStateType>(mapStateToProps, {
  logout
})(HeaderContainer);
