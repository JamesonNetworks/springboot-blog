import { connect } from 'react-redux'
import Menu from '../components/menu.jsx';
import {fetchEntries, changeEntry, goBackOne, goForwardOne} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onInitialLoad: () => {
            dispatch(fetchEntries());
        },
        onChange: (entry) => {
            dispatch(changeEntry(entry))
        },
        onLeftArrowClick: () => {
            dispatch(goBackOne());
        },
        onRightArrowClick: () => {
            dispatch(goForwardOne());
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

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

export default MenuContainer
