import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { CreateField, GetStringKeys, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login, getCaptchaUrl } from '../../redux/auth-reducer';
import styles from './Login.module.css';
import { selectCaptchaUrl, selectIsAuth } from '../../redux/users-selectors';

// Login: React.FC<mapStatePropsType> - компонента принимает аргументы mapStatePropsType
export const Login: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onSubmit = (formData: LoginFormValuesType) => {
    // TODO: не пойму как тут пропиcать типы для Promise.reject(message)
    dispatch(
      login(formData.email, formData.password, formData.rememberMe, formData.captcha) as unknown as Promise<any>
    ).catch(error => {
      // при ошибке входа спрашивает капчу
      dispatch(getCaptchaUrl());
      console.error(error);
    });
  };
  if (isAuth) {
    return <Redirect to='/profile' />;
  }
  return (
    <div>
      <h1>Login</h1>
      {/* onSubmit={onAddPost} - Автоматически прокидывает этот сабмит в handleSubmit(обязательно имя onSubmit) */}
      <ReduxLoginForm onSubmit={onSubmit} />
    </div>
  );
};
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({
  handleSubmit,
  error
  // captchaUrl
}) => {
  const captchaUrl = useSelector(selectCaptchaUrl);
  return (
    <form onSubmit={handleSubmit}>
      {CreateField<LoginFormValuesTypeKeys>('Name', 'email', [required], Input)}
      {CreateField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {
        type: 'password'
      })}
      {CreateField<LoginFormValuesTypeKeys>(
        undefined,
        'rememberMe',
        [],
        Input,
        { type: 'checkbox' },
        'Remember me',
        styles.fieldRememberMe
      )}
      {captchaUrl && (
        <div>
          <img src={captchaUrl} alt='captcha' />
          {CreateField<LoginFormValuesTypeKeys>('Enter captcha', 'captcha', [required], Input)}
        </div>
      )}
      {error && <div className={styles.errorLogin}>{error}</div>}
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};
const ReduxLoginForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm);

// Types
type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;
