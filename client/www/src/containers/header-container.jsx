import { connect } from 'react-redux'
import Header from '../components/header.jsx';
import {articleList} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onBackClick: () => {
            dispatch(articleList());
        }
    }
};

const mapStateToProps = (state) => {
    return {}
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
