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
					<div className="column">
						<div className="ui card">
							<div className="content">
								<div className="header">About Brent Jameson</div>
								<div className="description">
									<p>I'm a software developer in Charleston, SC. I've been in the web technologies industry for over 8 years and enjoy working on any technology. I've professionally worked on projects using Java, C#, PHP, Coffeescript, Javascript, React, Angular, Knockout and many other technologies. I'm currently employed working on eCommerce websites on a variety of platforms. Feel free to contact me for assistance or quotes.</p>
								</div>
							</div>
							<div className="extra content">
								<a href="#">Contact Me</a>
								<div className="right floated author">
									<img className="ui avatar image" src="https://secure.gravatar.com/avatar/d9cb6cfd91d71964be0ab1bd5d2cb4ab"/>
								</div>
							</div>
						</div>
					</div>
                <div className="column">
                Copyright 2017 : JamesonNetworks. All Rights Reserved. See the code <a href="https://github.com/JamesonNetworks/blog" target="_blank">here</a>
                </div>
            </div>
        );
    }
}

export default Footer;
