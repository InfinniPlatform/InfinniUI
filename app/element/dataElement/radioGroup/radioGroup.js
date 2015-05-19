function RadioGroup(parentView) {
    _.superClass(RadioGroup, this, parentView);
}

_.inherit(RadioGroup, Element);

_.extend(RadioGroup.prototype, {

        createControl: function () {
            return new RadioGroupControl();
        },

        getReadOnly: function () {
            return this.control.get('readOnly');
        },

        setReadOnly: function (readOnly) {
            if (readOnly === true || readOnly === false ) {
                this.control.set('readOnly', readOnly);
            }
        },

        getValueProperty: function () {
            return this.control.get('valueProperty');
        },

        setValueProperty: function (valueProperty) {
            this.control.set('valueProperty', valueProperty);
        },

        getDisplayProperty: function () {
            return this.control.get('displayProperty');
        },

        setDisplayProperty: function (displayProperty) {
            this.control.set('displayProperty', displayProperty)
        },

        getItemFormat: function () {
            return this.control.get('itemFormat');
        },

        setItemFormat: function (itemFormat) {
            this.control.set('itemFormat', itemFormat);
        },

        getItemTemplate: function () {
            return this.control.get('itemTemplate');
        },

        /**
         *
         * @param {function} itemTemplate
         */
        setItemTemplate: function (itemTemplate) {
            this.control.set('itemTemplate', itemTemplate);
        },

        addItem: function (item) {
            /** @TODO Реализовать **/
        },

        removeItem: function (item) {
            /** @TODO Реализовать **/
        },

        getItems: function () {
            return this.control.get('items');
        },

        setItems: function (items) {
            this.control.set('items', items);
        },

        getDataNavigation: function () {
            return this.control.get('dataNavigation');
        },

        setDataNavigation: function (dataNavigation) {
            this.control.set('dataNavigation', dataNavigation);
        },

        getItem: function () {
            return this.control.get('item');
        },

        getFocusedItems: function () {
            //@TODO Реализовать
        },

        setFocusedItem: function () {
            //@TODO Реализовать
        },

        setOrientation: function (orientation) {
            this.control.set('orientation', orientation);
        },

        getOrientation: function () {
            return this.control.get('orientation');
        }
    },
    valuePropertyMixin
);