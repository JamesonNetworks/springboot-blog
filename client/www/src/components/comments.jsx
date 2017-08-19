import React from 'react';
import moment from 'moment';
import {each, map, sortBy, filter, reverse} from 'lodash';

require("./comments.scss");

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.onItemClick = (event) => {
            this.props.onBackClick();
        }
    }
    componentDidMount() {
        if(this.props.loading === true) {
            this.props.onInitialLoad();
        }
    }
    render() {
        return (
            <div className="comments">
                <h2>Comments</h2>
                <p>There are currently no comments </p>
                <p><a href="#">Sign in</a> to leave a commment </p>
            </div>
        );
    }
}

export default Comments;
