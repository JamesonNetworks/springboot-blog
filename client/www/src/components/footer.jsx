import React from 'react';

require("./footer.scss");

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                Copyright 2016 : JamesonNetworks. All Rights Reserved. See the code <a href="https://github.com/JamesonNetworks/blog" target="_blank">here</a>
            </div>
        );
    }
}

export default Footer;
