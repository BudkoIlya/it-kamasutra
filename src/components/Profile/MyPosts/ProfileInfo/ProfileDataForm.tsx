import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../../types/types';
import {
  CreateField,
  GetStringKeys,
  Input,
  Textarea,
} from '../../../common/FormsControls/FormsControls';

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ isOwner, handleSubmit, profile }) => (
  <form onSubmit={handleSubmit}>
    {isOwner && (
      <div>
        <button type="submit">Save</button>
      </div>
    )}
    <div>
      <b>Full name </b>:{' '}
      {CreateField<LoginFormValuesTypeKeys>('Full name', 'fullName', [], Input)}
    </div>
    <div>
      <b>Looking for a job</b>:{' '}
      {CreateField<LoginFormValuesTypeKeys>('', 'lookingForAJob', [], Input, {
        type: 'checkbox',
      })}
    </div>
    <div>
      <b>My Professional skills</b>
      {CreateField<LoginFormValuesTypeKeys>(
        'My Professional skills',
        'lookingForAJobDescription',
        [],
        Textarea
      )}
    </div>
    <div>
      <b>About me</b>:{' '}
      {CreateField<LoginFormValuesTypeKeys>(
        'About me',
        'aboutMe',
        [],
        Textarea
      )}
    </div>
    <div>
      <b>Contacts</b>:
      {Object.entries(profile.contacts).map((contact, idx) => (
        <div key={String(idx)}>
          {/* если писать имя через точку это указывает вложенность объекта для redux form */}
          {/* todo: create some solution for embedded objects `contacts.${contact[0]}` */}
          {contact[0]}:{' '}
          {CreateField('Enter contact', `contacts.${contact[0]}`, [], Input)}
        </div>
      ))}
    </div>
  </form>
);

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({
  form: 'profileEdit',
})(ProfileDataForm);

export default ProfileDataFormRedux;

// Types
type PropsType = {
  isOwner: boolean;
  profile: ProfileType;
};

type LoginFormValuesTypeKeys = GetStringKeys<ProfileType>;
