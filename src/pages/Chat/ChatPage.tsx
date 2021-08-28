import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';

// const WS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

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

const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log('CLOSE WS');
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();
      ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
      );
      ws.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }
    createChannel();
    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, []);
  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)]);
    };
    wsChannel?.addEventListener('message', messageHandler);
    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);
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
      style={{
        width: '50px',
        border: '1px solid grey',
        padding: '5px',
        marginRight: '5px',
      }}
      alt="img"
    />
    <b>{message.userName}</b>
    <div>{message.message}</div>
    <hr />
  </div>
);
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
    'pending'
  );
  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    };
    wsChannel?.addEventListener('open', openHandler);
    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);
  const sendMessage = async () => {
    if (!message) return;
    await wsChannel?.send(message);
    setMessage('');
  };
  return (
    <div>
      <Formik
        enableReinitialize
        onSubmit={sendMessage}
        initialValues={{ chat: message }}
      >
        {() => (
          <Form
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
          >
            <Field
              style={{ resize: 'none' }}
              as="textarea"
              name="chat"
              placeholder="Send message"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setMessage(e.currentTarget.value)
              }
            />
            <Button
              disabled={!wsChannel && readyStatus === 'ready'}
              style={{ marginLeft: '10px' }}
              htmlType="submit"
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
