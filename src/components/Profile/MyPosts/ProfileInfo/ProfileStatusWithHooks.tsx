import React, { useState, useEffect, ChangeEvent } from 'react';

const ProfileStatusWithHooks: React.FC<PropsType> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setStatus] = useState(status);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(newStatus);
  };
  const setValueSatus = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setStatus(target.value);
  };
  return (
    <>
      {!editMode ? (
        <div>
          <b>Status:</b>
          <span onDoubleClick={activateEditMode}>{status || 'добавить статус'}</span>
        </div>
      ) : (
        <div>
          <input autoFocus onBlur={deactivateEditMode} value={newStatus} onChange={setValueSatus} />
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;

// Types
type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};
