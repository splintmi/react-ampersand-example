(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        render: function () {
            var model = this.props.model;

            return (
                <li>{model.attributes.name}</li>
            );
        }
    });
}());
