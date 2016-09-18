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
    return {}
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export default FooterContainer
