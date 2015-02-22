(function () {
    'use strict';

    var PoiItem = require('./poi-item.jsx'),

        React = require('react');

    module.exports = React.createClass({
        getInitialState: function () {
            return {
                filter: ''
            };
        },

        componentDidMount: function () {
            this.props.collection.on('change', this.forceUpdate);
        },

        render: function () {
            return (
                <form>
                    <input type="text" onChange={this.filter} />
                    <ul>
                        {this.renderChildren()}
                    </ul>
                </form>
            );
        },

        renderChildren: function () {
            var collection = this.props.collection,
                filterInput = this.state.filter;

            return collection
                .filter(function (model) {
                    return (model.get('name').indexOf(filterInput) > -1);
                })
                .map(function (model) {
                    return (
                        <PoiItem model={model} />
                    );
                }, this);
        },

        filter: function (event) {
            var filterInput = event.currentTarget.value;

            this.setState({
                filter: filterInput
            });
        }
    });
}());
