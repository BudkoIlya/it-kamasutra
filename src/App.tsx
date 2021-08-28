import React, { Component, ComponentType, FC, lazy, Suspense } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';

import { Login } from './components/Login/Login';
import { initializeApp } from './redux/App-reducer';
import Preloader from './components/common/preloader/preloader';
import store, { AppStateType } from './redux/redux-store';
import { AppHeader } from './components/Header/AppHeader';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = lazy(
  () => import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = lazy(
  () => import('./components/Profile/ProfileContainer')
);
const UsersPage = lazy(() =>
  import('./components/Users/UsersPage').then(({ UserPageAuthRedirect }) => ({
    default: UserPageAuthRedirect,
  }))
);
const ChatPage = lazy(() =>
  import('./pages/Chat/ChatPage').then((module) => ({
    default: module.ChatPage,
  }))
);

// App - компонента, возвращающая jsx. В validators.ts обозначается как тег <App />
class App extends Component<PropsType & DispatchPropsType> {
  componentDidMount() {
    const { initializeApp: initialize } = this.props;
    initialize();
    // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  // componentWillUnmount() {
  //   window.removeEventListener(
  //     'unhandledrejection',
  //     this.catchAllUnhandledErrors
  //   );
  // }

  // catchAllUnhandledErrors = () => {
  //   alert('Some error occurred');
  // };

  render() {
    const { initialized } = this.props;
    if (!initialized) return <Preloader />;
    return (
      <Layout>
        <AppHeader />
        <Content style={{ padding: '0 50px' }}>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/dialogs">Messages</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Developers"
                >
                  <Menu.Item key="3">
                    <Link to="/users">Users</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<div>Loading...</div>}>
                {/* Route следит за изменением пути, switch указывает точный путь */}
                <Switch>
                  <Redirect exact from="/" to="/profile" />
                  <Route
                    // указывает userId(можно назвать как хочешь) что бы в params вытащить id
                    path="/profile/:userId?"
                    render={() => <ProfileContainer />}
                  />
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route path="/users" render={() => <UsersPage />} />
                  <Route path="/login" render={() => <Login />} />
                  <Route path="/chat" render={() => <ChatPage />} />
                  <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

// контейнер
const AppContainer = compose<FC | ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

// еще контейнер для подключение стора, перенесено в этот файл чтобы сработал тест App.text.js
const SamuraiApp: React.FC = () => (
  // <BrowserRouter> - используется с Route
  <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </QueryParamProvider>
  </BrowserRouter>
);

export default SamuraiApp;

// types
type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
