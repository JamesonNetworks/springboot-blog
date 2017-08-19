import React from 'react';
import {getBaseUrl} from '../main/util';
import moment from 'moment';

require('./entry.scss');

var PictureContent = React.createClass({
    render: function() {
        var content = this.props.content;
        var picture = {};
        var date = this.props.date;
        picture.url = getBaseUrl() + 'entries/' + date + '_' + content.id + '.' + content.fileType;
        picture.alttext = content.altText;
        return (
            <div className="post-content img-cont"><img src={picture.url} alt={content.altText} className="img"/></div>
        )
    }
});

var CodeContent = React.createClass({
    render: function() {
        var content = this.props.content;
        var style = {overflow:"scroll"};
        return (
            <pre className="prettyprint linenums" style={style} >{content.content}</pre>
        )
    }
});

var QuoteContent = React.createClass({
    render: function() {
        var content = this.props.content;
        return (
            <div></div>
        )
    }
});

var ParagraphContent = React.createClass({
    render: function() {
        var content = this.props.content;
        return (
            <p className="post-content">{content.content}</p>
        )
    }
});


var Content = React.createClass({
    render: function() {
        var date = this.props.date;
        var content = this.props.content;
        var contentComponent;
        switch(content.type) {
            case "picture":
                return <PictureContent content={content} date={date} />
                break;
            case "code":
                return <CodeContent content={content} date={date} />
                break;
            case "quote":
                return <QuoteContent content={content} date={date} />
                break;
            default:
                return <ParagraphContent content={content} date={date} />
        }
    }
});

var Section = React.createClass({
    render: function() {
        var section = this.props.section;
        var contents = section.contents;
        var articleContents = [];
        var date = this.props.date;
        if(contents) {
            for (var i=0; i < contents.length; i++) {
                let sectionKey = "selector-" + i;
                articleContents.push(<Content key={sectionKey} content={contents[i]} date={date} />);
            }
        }
        return (
            <div>
                <div className="ui divider section-divider"></div>
                <div className="section-title>"><h3>{section.title}</h3></div>
                <div className="ui divider section-divider"></div>
                <div className="section-divider-pad"></div>
                {articleContents}
            </div>
        );
    }
});

var FirstSection = React.createClass({
    render: function() {
        var section = this.props.section;
        var contents = section.contents;
        var articleContents = [];
        var date = this.props.date;
        if(contents) {
            for (var i=0; i < contents.length; i++) {
                let sectionKey = "selector-" + i;
                articleContents.push(<Content key={sectionKey} content={contents[i]} date={date} />);
            }
        }
        return (
            <div>
                {articleContents}
            </div>
        );
    }
});

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        function doPrettyPrint() {
            (function(){
                PR.prettyPrint();
            })();
        }
        doPrettyPrint();
    }

    render() {
        let loading = this.props.loading;
        let entryClassName = loading ? 'entry hide' : 'entry ';
        let notFound = () => { return (<div className={entryClassName}>No entries found.</div>) }
        if(!this.props.currentEntry) {
            return notFound();
        }
        var entry = this.props.currentEntry;
        if(!entry.title) {
            return notFound();
        }
        var date = entry.date;

        var sections = entry.markdown.sections;
        var articleSections = [];
        if(sections) {
            for (var i=0; i < sections.length; i++) {
                let sectionKey = "section-key-" + i;
                if(i === 0) {
                    articleSections.push(React.createElement(FirstSection, {key: sectionKey, section: sections[i], date: date}));
                }
                else {
                    articleSections.push(React.createElement(Section, {key: sectionKey, section: sections[i], date: date}));
                }
            }
        }

        let showArticleList = this.props.showArticleList;

        let dateObj = new Date(Number.parseInt(date));
        let prettyDate = moment(dateObj).format("MMMM Do YYYY");

        return (
            <div className="ui two column divided grid">
                <div className="row">
                    <div className="column">
                        <div className="ui large header article-header">{entry.title}</div>
                    </div>
                    <div className="column blog-header">
						<div className="ui cards">
							<div className="card">
								<div className="content">
									<div className="header">
										Brent Jameson
                                        <img className="ui floated right avatar image" src="https://secure.gravatar.com/avatar/d9cb6cfd91d71964be0ab1bd5d2cb4ab"/>
									</div>
									<div className="meta">
										Software Engineer
									</div>
								</div>
					        </div>	
						</div>
					</div>
				</div>
                <div className="row">
                    <div className="ui centered column">
                        <div className="ui small header centered">{prettyDate}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="ui small header subtitle">{entry.subtitle}</div>
                    <div className="ui divider"></div>
                </div>
                <div className="row">
                    {articleSections}
                    <div className="ui divider"></div>
                </div>
            </div>
	);
}
}

export default Entry;
