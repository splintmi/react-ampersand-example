(function () {
    'use strict';

    var React = require('react');

    function handleChecked(event) {
        var checked = event.currentTarget.checked;

        this.setState({
            checked: checked
        });

        this.props.onChecked(checked);
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
                <li>
                    <input type="checkbox" onChange={handleChecked.bind(this)}/>
                    {model.attributes.name}
                </li>
            );
        }
    });
}());
