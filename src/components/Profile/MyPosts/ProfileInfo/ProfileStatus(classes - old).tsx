import React, { ChangeEvent, Component } from 'react';
// import classes from './ProfileInfo.module.css'

type PropsType = {
  status: string;
  updateStatus: (valueStatus: string) => void;
};
type StateType = {
  editMode: boolean;
  valueStatus: string;
};

class ProfileStatus extends Component<PropsType, StateType> {
  state = {
    editMode: false,
    valueStatus: this.props.status,
  };

  componentDidUpdate(prevProps: PropsType) {
    const { status } = this.props;
    // eslint-disable-next-line react/no-did-update-set-state
    prevProps.status !== status && this.setState({ valueStatus: status });
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.valueStatus);
  };

  setValueStatus = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ valueStatus: value });
  };

  render() {
    const { status } = this.props;
    const { valueStatus, editMode } = this.state;
    return (
      <>
        {!editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {status || 'добавить статус'}
            </span>
          </div>
        ) : (
          <div>
            <input
              autoFocus
              onBlur={this.deactivateEditMode}
              value={valueStatus}
              onChange={this.setValueStatus}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
