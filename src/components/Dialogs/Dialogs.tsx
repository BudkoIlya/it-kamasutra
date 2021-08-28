import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { CreateField, Textarea } from '../common/FormsControls/FormsControls';
import { required, requiredMaxLength } from '../../utils/validators/validators';
import { InitialStateType } from '../../redux/dialogs-reducer';

const maxLength = requiredMaxLength(30);

const Dialogs: React.FC<OwmPropsType> = ({ dialogsPage, sendMessages }) => {
  const dialogsElements = dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  const messagesElements = dialogsPage.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  const onSendMessageClick = (value: NewMessageFormType) => {
    sendMessages(value.newMessageBody);
  };
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
        <div>
          {/* onSubmit={onAddPost} - автоматически прокидывает этот сабмит в handleSubmit(обязательно имя onSubmit) */}
          <AddMessageFormRedux onSubmit={onSendMessageClick} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType>> = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      {CreateField<keyof NewMessageFormType>(
        'Введите сообщение',
        'newMessageBody',
        [required, maxLength],
        Textarea
      )}
    </div>
    <div>
      <button type="submit">Отправить</button>
    </div>
  </form>
);

const AddMessageFormRedux = reduxForm<NewMessageFormType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

export default Dialogs;

// types
type OwmPropsType = {
  dialogsPage: InitialStateType;
  sendMessages: (newMessageBody: string) => void;
};
type NewMessageFormType = {
  newMessageBody: string;
};
