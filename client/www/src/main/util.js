export function getBaseUrl() {
    var currentUrl = window.location.href;
    if(currentUrl.indexOf('.dev') > 0) {
        return 'http://localhost:8080/';
    }
    else {
        return '/';
    }
}
