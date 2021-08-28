import { compose } from 'redux';
import { connect } from 'react-redux';
import { ComponentType, FC } from 'react';
import Dialogs from './Dialogs';
import { actions } from '../../redux/dialogs-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { AppStateType } from '../../redux/redux-store';

// Передаём часть state для DialogsContainer
const mapStateToProps = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
});

export default compose<FC | ComponentType>(
  withAuthRedirect, // hoc для ридеректа
  connect(mapStateToProps, { ...actions })
)(Dialogs);
