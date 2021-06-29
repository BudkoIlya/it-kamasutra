import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import classes from './ProfileInfo.module.css';
import Preloader from '../../../common/preloader/preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../../assets/img/user.png';
import ProfileDataForm from './ProfileDataForm';
import { ProfileType } from '../../../../types/types';
import { AppStateType } from '../../../../redux/redux-store';

const ProfileInfo: React.FC<ProfileInfoPropsT & MapStateToPropsT> = ({
  profile,
  status,
  updateStatus,
  isFetching,
  isOwner,
  savePhoto,
  saveProfile
}) => {
  const handlePhotoSelected = ({ target }: ChangeEvent<HTMLInputElement>) =>
    target.files?.length && savePhoto(target.files[0]);
  const [editMode, setEditMode] = useState(false);

  const onSubmit = (formData: ProfileType) => {
    // todo: remove then
    saveProfile(formData)
      .then(() => {
        setEditMode(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {!profile ? (
        <Preloader isFetching={isFetching} />
      ) : (
        <div className={classes.descriptionBlock}>
          <img alt='profileImg' src={profile.photos.large || userPhoto} className={classes.mainPhoto} />
          {isOwner && <input type='file' onChange={handlePhotoSelected} />}
          {/* initialValues - устанавливает значения в поля автоматически если совпадают имена свойст и полей */}
          {editMode ? (
            <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} isOwner={isOwner} />
          ) : (
            <ProfileData profile={profile} isOwner={isOwner} handleToggleMode={() => setEditMode(true)} />
          )}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      )}
    </div>
  );
};

const ProfileData: React.FC<ProfileDataTypes> = ({ profile, isOwner, handleToggleMode }) => (
  <div className={classes.descriptionBlock}>
    {isOwner && (
      <div>
        <button type='button' onClick={handleToggleMode}>
          Edit
        </button>
      </div>
    )}
    <div>
      <b>Full name </b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
    </div>
    {profile.lookingForAJob && (
      <div>
        <b>My Professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    )}
    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b>:
      {Object.entries(profile.contacts).map((contact, idx) => (
        <Contacts key={String(idx)} contactTitle={contact[0]} value={contact[1]} />
      ))}
    </div>
  </div>
);

const Contacts: React.FC<ContactsType> = ({ contactTitle, value }) => (
  <div>
    {contactTitle}: {value}
  </div>
);
const MapStateToProps = (store: AppStateType) => ({ isFetching: store.usersPage.isFetching });

export default connect(MapStateToProps)(ProfileInfo);

// Types
export type ProfileInfoPropsT = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (photo: File) => void;
  saveProfile: (newProfileData: ProfileType) => Promise<void>;
};

type MapStateToPropsT = {
  isFetching: boolean;
};

type ProfileDataTypes = {
  isOwner: boolean;
  profile: ProfileType;
  handleToggleMode: () => void;
};

type ContactsType = {
  contactTitle: string;
  value: string;
};
