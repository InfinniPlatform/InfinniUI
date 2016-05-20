/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TabPanelControl(parent) {
    _.superClass(TabPanelControl, this, parent);
}

_.inherit(TabPanelControl, ContainerControl);

_.extend(TabPanelControl.prototype, /** @lends TabPanelControl.prototype */ {

    setSelectedItem: function (value) {
        /**
         * @TODO Отрефакторить! Временное решение т.к. коллекция model.items содержит не экземпляры страниц а метаданные! см. templating в Container
         */
        var
            selectedItem = null,
            model = this.controlModel,
            elements = this.controlView.childElements,
            items = model.get('items');

        if (value instanceof TabPage) {
            model.set('selectedItem', value)
        } else if (Array.isArray(elements)) {
            var index = items.indexOf(value);
            if (index !== -1) {
                selectedItem = elements[index];
            }
            this.controlModel.set('selectedItem', selectedItem);
        }
    },

    createControlModel: function () {
        return new TabPanelModel();
    },

    createControlView: function (model) {
        return new TabPanelView({model: model});
    }

});

