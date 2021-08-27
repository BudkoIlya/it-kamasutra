type SubscribeType = (messages: ChatMessageType[]) => void;
let subscribers = [] as Array<SubscribeType>;

let ws: WebSocket;
const closeHandler = () => {
  console.log('CLOSE WS');
  setTimeout(createChannel, 3000);
};
function createChannel() {
  ws?.removeEventListener('close', closeHandler);
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach(s => s(newMessages));
};

export const chatAPI = {
  subscribe(callback: SubscribeType) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    };
  },
  unsubscribe(callback: SubscribeType) {
    subscribers = subscribers.filter(s => s !== callback)
  }
};

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
