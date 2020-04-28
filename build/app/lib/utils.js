"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mediaQueryDetectorElem;
function initialize() {
    // Media query detector stuff.
    mediaQueryDetectorElem =
        document.getElementById('mediasoup-demo-app-media-query-detector');
    return Promise.resolve();
}
exports.initialize = initialize;
function isDesktop() {
    return Boolean(mediaQueryDetectorElem.offsetParent);
}
exports.isDesktop = isDesktop;
function isMobile() {
    return !mediaQueryDetectorElem.offsetParent;
}
exports.isMobile = isMobile;
