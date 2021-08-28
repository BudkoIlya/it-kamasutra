import { InferActionsTypes } from './redux-store';

export const actions = {
  sendMessages: (newMessage: string) =>
    ({ type: 'dialogs/SEND-MESSAGE', newMessage } as const),
};

export type InitialStateType = typeof initialState;

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How a u' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
  ] as Array<DialogsType>,
  dialogs: [
    { id: 1, name: 'Roman' },
    { id: 2, name: 'Ilya' },
    { id: 3, name: 'Anton' },
    { id: 4, name: 'Andrey' },
  ] as MessagesType[],
};

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  let stateCopy;
  switch (action.type) {
    case 'dialogs/SEND-MESSAGE': {
      const newMessage = {
        id: state.messages.length + 1,
        message: action.newMessage,
      };
      // Редакс работает только с копией экземпляра объекта, поэтому мы его копируем
      stateCopy = {
        ...state,
        // Порядок копии имеет значение, сначала мы копируем стайт,а потом уже глубже - сообщения
        // let stateCopy = {messages:[...state.messages], ...state} - не правильно, messages перезапишется и будет только ссылкой на оригинал
        // Аналог пушь, через запитую в спрэд операторе указать что хочешь добавить (newMessage),также можно добавить его в начало
        messages: [...state.messages, newMessage],
      };
      // stateCopy.messages.push(newMessage);
      // stateCopy.newMessageBody = '';
      return stateCopy;
    }
    default:
      return state;
  }
};

// types
type DialogsType = {
  id: number;
  message: string;
};
export type MessagesType = {
  id: number;
  name: string;
};
type ActionsType = InferActionsTypes<typeof actions>;

export default dialogsReducer;
