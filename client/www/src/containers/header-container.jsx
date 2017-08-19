import { connect } from 'react-redux'
import Header from '../components/header.jsx';
import {fetchEntries, changeEntry, goBackOne, goForwardOne, articleList} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onBackClick: () => {
            dispatch(articleList());
        },
        onLeftArrowClick: () => {
            dispatch(goBackOne());
        },
        onRightArrowClick: () => {
            dispatch(goForwardOne());
        },
        onInitialLoad: () => {
            dispatch(fetchEntries());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        entries: state.blog.entries,
        loading: state.blog.loading,
        current: state.blog.currentEntry,
        showArticleList: state.blog.showArticleList
    }
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
