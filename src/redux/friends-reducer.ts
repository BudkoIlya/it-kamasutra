type InitialFriendsState = typeof initialState;
export type FriendsType = {
  name: string;
  id: number;
  logo: string;
};

const initialState = {
  friends: [
    {
      name: 'Roman',
      id: 1,
      logo: 'http://www.clipartbest.com/cliparts/ncE/Ed7/ncEEd76ei.png'
    },
    {
      name: 'Anton',
      id: 2,
      logo: 'http://www.clipartbest.com/cliparts/ncE/Ed7/ncEEd76ei.png'
    },
    {
      name: 'Andrey',
      id: 3,
      logo: 'http://www.clipartbest.com/cliparts/ncE/Ed7/ncEEd76ei.png'
    }
  ] as Array<FriendsType>
};

const friendsReducer = (state = initialState): InitialFriendsState => state;

export default friendsReducer;
