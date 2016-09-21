import { connect } from 'react-redux'
import Footer from '../components/footer.jsx';
import {articleList} from '../main/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        onBackClick: () => {
            dispatch(articleList());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.blog.loading
    }
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export default FooterContainer
