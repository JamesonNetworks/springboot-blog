import { connect } from 'react-redux'
import Comments from '../components/comments.jsx';
import {fetchEntries, changeEntry, goBackOne, goForwardOne, articleList} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onInitialLoad: () => {
            dispatch(fetchEntries());
        },
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

const CommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);

export default CommentContainer
