(function () {
    'use strict';

    var PoiModel = require('./poi-model'),

        Collection = require('ampersand-rest-collection');

    module.exports = Collection.extend({
        model: PoiModel,
        url: '/poi?numItems=1000'
    });
}());
