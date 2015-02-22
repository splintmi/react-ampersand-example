(function () {
    'use strict';

    var PoiItem = require('./poi-item.jsx'),

        React = require('react');

    function modelIsFilteredIn(model, filterInput) {
        return (model.get('name').indexOf(filterInput) > -1);
    }

    function handleFilter(event) {
        var filterInput = event.currentTarget.value,
            numberOfVisiblySelectedItems = 0;

        this.props.collection.each(function (model) {
            var isVisible = modelIsFilteredIn(model, filterInput);

            if (model.get('active') && isVisible) {
                numberOfVisiblySelectedItems += 1;
            }
        });

        this.setState({
            filter: filterInput,
            itemsChecked: numberOfVisiblySelectedItems
        });
    }

    function selectAll(event) {
        var checked = event.currentTarget.checked,
            collection = this.props.collection;

        collection.each(function (model) {
            model.set('active', checked, {silent: true});
        });

        this.setState({
            itemsChecked: checked ? collection.length : 0
        });
    }

    function renderChildren() {
        var collection = this.props.collection,
            filterInput = this.state.filter;

        return collection
            .filter(function (model) {
                return modelIsFilteredIn(model, filterInput);
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
            var collection = this.props.collection,
                filterInput = this.state.filter;

            collection.on('change', function () {
                var selectedItems = collection.filter(function (model) {
                    return model.get('active') && modelIsFilteredIn(model, filterInput);
                });

                this.setState({
                    itemsChecked: selectedItems.length
                });
            }, this);
        },

        render: function () {
            return (
                <form>
                    <fieldset>
                        <label htmlFor="list-filter">Filter the list: </label>
                        <input name="list-filter" type="text" onChange={handleFilter.bind(this)} />

                        <label htmlFor="list-filter">Select All</label>
                        <input name="select-all" type="checkbox" onChange={selectAll.bind(this)} />
                        <ul>
                            {renderChildren.call(this)}
                        </ul>
                    </fieldset>
                    <h2>{'Checked Items: ' + this.state.itemsChecked}</h2>

                </form>
            );
        }
    });
})();
