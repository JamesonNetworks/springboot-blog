import Moment from 'moment';
import $ from 'jquery';

const TOOLBAR = ".toolbar";
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

export function fade(callback) {
    if($(TOOLBAR).is(':visible')) {
        $(TOOLBAR).addClass('hide');
        $(ENTRY).removeClass('hide');
    }
    else {
        $(TOOLBAR).addClass('hide');
        $(ENTRY).removeClass('hide');
    }
    callback();
}