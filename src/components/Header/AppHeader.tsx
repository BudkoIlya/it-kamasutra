import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { selectIsAuth, selectLogin } from '../../redux/selectors';
import { logout } from '../../redux/auth-reducer';

export const AppHeader: React.FC = () => {
  const login = useSelector(selectLogin);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <Header className="header">
      <Row>
        <Col span={20}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/users">Users</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4} className={classes.loginBlock}>
          {isAuth ? (
            <div className={classes.login}>
              <Avatar
                alt={login || ''}
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
              />
              <div className={classes.title}>{login}</div>
              <Button type="primary" onClick={onLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};
