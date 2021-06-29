import { connect } from 'react-redux';
import Navbar from './Navbar';
import { AppStateType } from '../../redux/redux-store';
import { FriendsType } from '../../redux/friends-reducer';

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
  friends: state.listFriends.friends
});
// Передаём нужные dispatch'и для MyPostsContainer
const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;

type MapStateToProps = {
  friends: Array<FriendsType>;
};
