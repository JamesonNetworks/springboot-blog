import { connect } from 'react-redux'
import Entry from '../components/entry.jsx';
import {fetchEntries} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const mapStateToProps = (state) => {
    return {
        currentEntry: state.blog.currentEntry,
        showArticleList: state.blog.showArticleList
    }
};

const EntryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Entry);

export default EntryContainer
