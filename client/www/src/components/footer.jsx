import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

require("./footer.scss");

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.onBackClick = (event) => {
            this.props.onBackClick();
        }

    }

    render() {
        let footerClassName = this.props.loading ? 'footer hide' : 'footer';

        return (
            <div className={footerClassName}>
                <div className="actions">
                    <button onClick={this.onBackClick}>-- See All Articles --</button>
                </div>
                <div>
                Copyright 2016 : JamesonNetworks. All Rights Reserved. See the code <a href="https://github.com/JamesonNetworks/blog" target="_blank">here</a>
                </div>
            </div>
        );
    }
}

export default Footer;
