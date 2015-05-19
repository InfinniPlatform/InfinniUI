function ToolBarSeparatorBuilder() {
}

_.inherit(ToolBarSeparatorBuilder, ElementBuilder);

_.extend(ToolBarSeparatorBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
    },

    createElement: function (params) {
        return new ToolBarSeparator(params.parent);
    },

    initScriptsHandlers: function(params){

    }

});