(function () {
    'use strict';

    var React = require('react');

    require('./css/styles.css');

    function handleChecked(event) {
        var checked = event.currentTarget.checked;

        this.props.model.set('active', checked);
    }

    module.exports = React.createClass({
        getInitialState: function () {
            return {
                checked: false
            }
        },

        render: function () {
            var model = this.props.model;

            return (
                <li className="poi-item">
                    <input type="checkbox" onChange={handleChecked.bind(this)} checked={model.attributes.active}/>
                    {model.attributes.name}
                </li>
            );
        }
    });
}());
