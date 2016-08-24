function IconBuilder() {
    _.superClass(ButtonBuilder, this);
}

window.InfinniUI.IconBuilder = IconBuilder;

_.inherit(IconBuilder, ElementBuilder);

_.extend(IconBuilder.prototype, {

    createElement: function (params) {
        return new Icon(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;

        this.initBindingToProperty(params, 'Value');
    }

});
