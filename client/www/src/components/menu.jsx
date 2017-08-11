import React from 'react';
import moment from 'moment';
import {fade} from '../main/util';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

import gsap from 'gsap';

import ReactTransitionGroup from 'react-addons-css-transition-group';
require('react-addons-css-transition-group');

require('./menu.scss');

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.changeHandler = (event) => {
            var self = this;
            var entry_date = event.currentTarget.id;
            var entries = this.props.entries;
            var entry = filter(entries, (entry) => { return entry.date === entry_date; });


            self.props.onChange(entry[0]);
        }
        this.titleClickHandler = (event) => {
            this.props.onTitleClick();
        }
    }

    componentDidMount() {
        if(this.props.loading === true) {
            this.props.onInitialLoad();
        }
    }
    componentWillAppear(callback) {
        const el = findDOMNode(this);
        gsap.TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }
    componentWillEnter (callback) {
        const el = findDOMNode(this);
        gsap.TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }

    componentWillLeave (callback) {
        const el = findDOMNode(this);
        gsap.TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }

    render() {
        let entries = this.props.entries;
        let current = this.props.current;
        let showArticleList = this.props.showArticleList;

        let articleSelectorClassName = this.props.loading ? 'article-selector hide' : 'article-selector';

        if(!current) {
            current = entries[entries.length-1];
        }
        if(entries.length < 1) {
            return (<div className="article-selector"></div>)
        }
        let options = map(sortBy(entries, function(entry) { return Date.now() - entry.date }), (entry) => {
            let date = new Date(Number.parseInt(entry.date));
            let prettyDate = moment(date).format("MMM Do YYYY");
            return <div className="item" onClick={this.changeHandler} key={entry.date} id={entry.date}><div className="content"><div className="header">{entry.title}</div><div className="meta">{prettyDate}</div></div></div>
        });
        return (
            <div className={articleSelectorClassName}>
                <ReactTransitionGroup transitionName="menu"
                                      transitionAppear={true}
                                      transitionAppearTimeout={500}
                                      transitionEnterTimeout={500}
                                      transitionLeaveTimeout={300}>
                    { showArticleList ?
                        <div className="articles">
                            <h1 className="current-article">Brent Jameson's Blog</h1>
                            <p>Ruminations of a 30 something developer. I've mostly worked in web technologies, from C# to Coffeescript to PHP. I've moved from front end developer to back end developer and finally work as a full stack developer, solving any and all problems that come my way.</p>
                            <div className="ui items article-list">{options}</div>
                        </div>
                        :
                        <div className="toolbar">
                            <h1 className="current-article button" onClick={this.titleClickHandler}>{current.title}</h1>
                        </div>

                    }
                </ReactTransitionGroup>
            </div>
        );
    }

}

export default Menu;
