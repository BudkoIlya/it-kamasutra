import React, { FC, Component, ComponentType, lazy, Suspense } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import { Login } from './components/Login/Login';
import { initializeApp } from './redux/App-reducer';
import Preloader from './components/common/preloader/preloader';
import store, { AppStateType } from './redux/redux-store';

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersPage = lazy(() =>
  import('./components/Users/UsersPage').then(({ UserPageAuthRedirect }) => ({ default: UserPageAuthRedirect }))
);

// App - компонента, возвращающая jsx. В validators.ts обозначается как тег <App />
class App extends Component<PropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  catchAllUnhandledErrors = () => {
    alert('Some error occurred');
  };

  render() {
    if (!this.props.initialized) return <Preloader />;
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Suspense fallback={<div>Loading...</div>}>
            {/* Route следит за изменением пути, switch указывает точный путь */}
            <Switch>
              <Redirect exact from='/' to='/profile' />
              <Route
                // указывает userId(можно назвать как хочешь) что бы в params вытащить id
                path='/profile/:userId?'
                render={() => <ProfileContainer />}
              />
              <Route path='/dialogs' render={() => <DialogsContainer />} />
              <Route path='/users' render={() => <UsersPage />} />
              <Route path='/login' render={() => <Login />} />
              <Route path='*' render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized });

// контейнер
const AppContainer = compose<FC | ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

// еще контейнер для подключение стора, перенесено в этот файл чтобы сработал тест App.text.js
const SamuraiApp: React.FC = () => (
  // <BrowserRouter> - используется с Route
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
);

export default SamuraiApp;

// types
type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
