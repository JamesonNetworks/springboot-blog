import React from 'react';

require("./footer.scss");

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.onBackClick = (event) => {
            this.props.onBackClick();
        }

    }

    render() {
        let footerClassName = this.props.loading ? 'row footer hide' : 'row footer';

        return (
            <div className={footerClassName}>
                <div>
                Copyright 2017 : JamesonNetworks. All Rights Reserved. See the code <a href="https://github.com/JamesonNetworks/blog" target="_blank">here</a>
                </div>
            </div>
        );
    }
}

export default Footer;
