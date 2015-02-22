(function () {
    'use strict';

    var PoiItem = require('./poi-item.jsx'),

        React = require('react');

    function handleFilter(event) {
        var filterInput = event.currentTarget.value,
            numberOfVisiblySelectedItems = 0;

        this.props.collection.each(function (model) {
            var isVisible = (model.get('name').indexOf(filterInput) > -1);

            if (model.get('active') && isVisible) {
                numberOfVisiblySelectedItems += 1;
            }
        });

        this.setState({
            filter: filterInput,
            itemsChecked: numberOfVisiblySelectedItems
        });
    }

    function renderChildren() {
        var collection = this.props.collection,
            filterInput = this.state.filter;

        return collection
            .filter(function (model) {
                return (model.get('name').indexOf(filterInput) > -1);
            })
            .map(function (model) {
                return (
                    <PoiItem key={model.id} model={model} />
                );
            }, this);
    }

    module.exports = React.createClass({
        getInitialState: function () {
            return {
                filter: '',
                itemsChecked: 0
            };
        },

        componentDidMount: function () {
            var collection = this.props.collection;

            collection.on('change', function () {
                var selectedItems = collection.filter(function (model) {
                    return model.get('active');
                });

                this.setState({
                    itemsChecked: selectedItems.length
                });
            }, this);
        },

        render: function () {
            return (
                <form>
                    <input type="text" onChange={handleFilter.bind(this)} />
                    <ul>
                        {renderChildren.call(this)}
                    </ul>
                    <h2>{'Checked Items: ' + this.state.itemsChecked}</h2>
                </form>
            );
        }
    });
})();
