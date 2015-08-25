var ButtonBuilder = function (buttonConstructor) {
    this.buttonConstructor = buttonConstructor ? buttonConstructor : Button;

};

_.inherit(ButtonBuilder, ElementBuilder);

_.extend(ButtonBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        /**
         * @TODO Исправить в PropertyBinding хардкод вызова метода this.element.setValue(this.getPropertyValue());!!!
         */

        this.initFormatProperty(params);
        //this.initValueProperty(params);
        this.initHorizontalTextAlignmentProperty(params);
        this.initScriptsHandlers(params);

        params.element.setImage(params.metadata.Image);

        if(params.metadata.Action) {
            params.element.setAction(params.builder.build(params.view, params.metadata.Action, params.collectionProperty));
        }
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        if (params.view && metadata.OnClick){
            params.element.onClick(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnClick.Name);
            });
        }
    },

    createElement: function(params){
        var ButtonConstructor = this.buttonConstructor ? this.buttonConstructor : Button;

        return new ButtonConstructor(params.view);
    }

}, builderFormatPropertyMixin, builderHorizontalTextAlignmentPropertyMixin);

