var TreeViewModel = ControlModel.extend({
    defaults: _.extend({
        multiSelect: false,
        showNodeImages: false,
        keyProperty: '',
        parentProperty: '',
        imageProperty: '',
        verticalAlignment: 'Stretch',
        /** Inherited from BaseListElement */
        readOnly: false,
        items: []
    }, ControlModel.prototype.defaults)
});
