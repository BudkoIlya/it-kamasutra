import { PhotosType, ProfileType } from '../types/types';
import { instance, ResponseType } from './api';

type SavePhotoResponseDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>('profile/status', { status }).then(res => res.data);
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance
      .put<ResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => res.data);
  },
  saveProfile(newProfileData: ProfileType) {
    return instance.put('profile', newProfileData).then(res => res.data);
  }
};
