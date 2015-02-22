(function () {
    'use strict';

    var Model = require('ampersand-model');

    module.exports = Model.extend({
        props: {
            id: 'integer',
            name: 'string'
        }
    });
}());
