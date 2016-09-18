import Moment from 'moment';
import $ from 'jquery';

const ARTICLE_SELECTOR = ".article-selector";
const ENTRY = ".entry";

export function getBaseUrl() {
    var currentUrl = window.location.href;
    if(currentUrl.indexOf('.dev') > 0) {
        return 'http://localhost:8080/';
    }
    else {
        return '/';
    }
}

export function fadeIn(callback) {
    $(ARTICLE_SELECTOR).fadeIn($(ENTRY).fadeIn(callback));
}

export function fadeOut(callback) {
    $(ARTICLE_SELECTOR).fadeOut($(ENTRY).fadeOut(callback));
}