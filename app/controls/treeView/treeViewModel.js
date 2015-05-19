var TreeViewModel = ControlModel.extend({
    defaults: _.extend({
        multiSelect: false,
        showNodeImages: false,
        keyProperty: '',
        parentProperty: '',
        imageProperty: '',
        /** Inherited from BaseListElement */
        readOnly: false,
        items: []
    }, ControlModel.prototype.defaults)
});
