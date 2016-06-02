import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

require('../main/select.js');

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.changeHandler = (title) => {
            let entries = this.props.entries;
            let entry = _.filter(entries, (entry) => { return entry.title === title; });
            this.props.onChange(entry[0]);
        }
        this.rightArrowClickHandler = (event) => {
            if(!$(event.currentTarget).hasClass('disable')) {
                $('.current-article').fadeOut(() => {  
                    this.props.onRightArrowClick(); 
                    $('.current-article').fadeIn();
                });
            }
        }
        this.leftArrowClickHandler = (event) => {
            if(!$(event.currentTarget).hasClass('disable')) {
                $('.current-article').fadeOut(() => {  
                    this.props.onLeftArrowClick(); 
                    $('.current-article').fadeIn();
                });
            }
        }
    }

    componentDidMount() {
        if(this.props.loading === true) {
            this.props.onInitialLoad();
        }
    }

    componentDidUpdate() {
    }

    render() {
        let entries = this.props.entries;
        let current = this.props.current;
        if(!current) {
            current = entries[entries.length-1];
        }
        if(entries.length < 1) {
            return (<div className="article-selector"></div>)
        }
        let options = _.map(entries, (entry) => {
            return <li id={entry.date}>{entry.title}</li>
        });
        let isLastEntry = (entries[entries.length-1].title === current.title);
        let isFirstEntry = (entries[0].title === current.title);
        let arrowClass = function(arrowClass, disabled) {
            return 'arrow arrow-' + arrowClass + ' ' + (disabled ? 'disable' : '');
        }
        return (
            <div className="article-selector">
                <div className={arrowClass('left', isFirstEntry)} onClick={this.leftArrowClickHandler}><img src="/images/glyphicons/png/glyphicons-601-chevron-up.png" /></div><div className="current-article">{current.title}</div><div className={arrowClass('right', isLastEntry)} onClick={this.rightArrowClickHandler}><img src="/images/glyphicons/png/glyphicons-601-chevron-up.png"/></div>
                <div className="articles"><ul>{options}</ul></div>
            </div>
        );
    }

}

export default Menu;
