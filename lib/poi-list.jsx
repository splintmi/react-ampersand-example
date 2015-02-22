(function () {
    'use strict';

    var PoiItem = require('./poi-item.jsx'),

        React = require('react');

    function childChecked(newValue) {
        var currentCheckedItems = this.state.itemsChecked;

        if (newValue) {
            this.setState({
                itemsChecked: currentCheckedItems + 1
            });
        } else {
            this.setState({
                itemsChecked: currentCheckedItems - 1
            });
        }
    }

    module.exports = React.createClass({
        getInitialState: function () {
            return {
                filter: '',
                itemsChecked: 0
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
                    <h2>{'Checked Items: ' + this.state.itemsChecked}</h2>
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
                        <PoiItem model={model} onChecked={childChecked.bind(this)}/>
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
