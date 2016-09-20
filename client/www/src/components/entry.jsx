import React from 'react';
import ReactDom from 'react-dom';
import {getBaseUrl} from '../main/util';
import $ from 'jquery';
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
            <div className="post-content">{content.content}</div>
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
                contentComponent = <PictureContent content={content} date={date} />
                break;
            case "code":
                contentComponent = <CodeContent content={content} date={date} />
                break;
            case "quote":
                contentComponent = <QuoteContent content={content} date={date} />
                break;
            default:
                contentComponent = <ParagraphContent content={content} date={date} />
        }
        return(
            <div className="post-article">{contentComponent}</div>
        )
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
                articleContents.push(<Content content={contents[i]} date={date} />);
            }
        }
        return (
            <div>
                <div className="section-title>"><h3>{section.title}</h3></div>
                <div className="section-divider"></div>
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
                articleContents.push(<Content content={contents[i]} date={date} />);
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
                $('pre').addClass('prettyprint');
                prettyPrint();
            })();
        }
        doPrettyPrint();
    }

    render() {
        let notFound = () => { return (<div className="entry">No entries found.</div>) }
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
                if(i === 0) {
                    articleSections.push(React.createElement(FirstSection, {section: sections[i], date: date}));
                }
                else {
                    articleSections.push(React.createElement(Section, {section: sections[i], date: date}));
                }
            }
        }

        let showArticleList = this.props.showArticleList;
        let className = showArticleList ? "entry hide" : "entry";

        let dateObj = new Date(Number.parseInt(date));
        let prettyDate = moment(dateObj).format("MMMM Do YYYY");

        return (
            <div className={className}>
                <div className="post-date">{prettyDate}</div>
                <div className="post-date-divider"></div>
                <div className="post-article">
                    <div className="post-field">
                        <div className="subtitle">{entry.subtitle}</div>
                    </div>
                    {articleSections}
                </div>
            </div>
        );
    }
}

export default Entry;
