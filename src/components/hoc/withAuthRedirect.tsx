import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export function withAuthRedirect(
  WrappedComponent: React.FC | React.ComponentType
) {
  const RedirectComponent = ({ isAuth }: MapStateToPropsType) => {
    if (!isAuth) return <Redirect to="/login" />;
    return <WrappedComponent />;
  };
  return connect<MapStateToPropsType, object, object, AppStateType>(
    mapStateToPropsForRedirect
  )(RedirectComponent);
}

// types
interface MapStateToPropsType {
  isAuth: boolean;
}
