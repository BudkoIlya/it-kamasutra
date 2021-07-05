import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';

const WS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export const ChatPage: React.FC = () => (
  <div>
    <Chat />
  </div>
);

const Chat: React.FC = () => (
  <div>
    <Messages />
    <AddMessageForm />
  </div>
);

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    WS.addEventListener('message', e => {
      setMessages(prevMessages => [...prevMessages, ...JSON.parse(e.data)]);
    });
  }, []);
  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((m: ChatMessageType, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Message message={m} key={i} />
      ))}
    </div>
  );
};
const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => (
  <div>
    <img
      src={message.photo}
      style={{ width: '50px', border: '1px solid grey', padding: '5px', marginRight: '5px' }}
      alt='img'
    />
    <b>{message.userName}</b>
    <div>{message.message}</div>
    <hr />
  </div>
);
const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const sendMessage = async () => {
    if (!message) return;
    await WS.send(message);
    setMessage('');
  };
  return (
    <div>
      <Formik enableReinitialize onSubmit={sendMessage} initialValues={{ chat: message }}>
        {() => (
          <Form style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Field
              style={{ resize: 'none' }}
              as='textarea'
              name='chat'
              placeholder='Send message'
              onChange={(e: React.FormEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)}
            />
            <Button style={{ marginLeft: '10px' }} htmlType='submit'>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
