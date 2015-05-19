var PopupButtonBuilder = function () {

};

_.inherit(PopupButtonBuilder, ButtonBuilder);

_.extend(PopupButtonBuilder.prototype, {

    applyMetadata: function(params){
        ButtonBuilder.prototype.applyMetadata.call(this, params);

        _.each(params.metadata.Items, function (metadataItem) {
            params.element.addItem(params.builder.build(params.parent, metadataItem));
        });
    },

    initScriptsHandlers: function(params){
        ButtonBuilder.prototype.initScriptsHandlers.call(this, params);
    },

    createElement: function(params){
        return new PopupButton(params.parent);
    }

});