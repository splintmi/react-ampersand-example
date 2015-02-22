(function () {
    'use strict';

    var PoiCollection = require('./lib/poi-collection'),
        PoiList = require('./lib/poi-list.jsx'),

        React = require('react');

    function start() {
        var collection = new PoiCollection(),
            PoiListElement = React.createElement(PoiList, {
                collection: collection
            });

        collection.fetch();

        collection.on('sync', function () {
            React.render(PoiListElement, document.querySelector('body'));
        });
    }

    start();
}());
