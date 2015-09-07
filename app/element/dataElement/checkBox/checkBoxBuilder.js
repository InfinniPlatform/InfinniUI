function CheckBoxBuilder() {
}

_.inherit(CheckBoxBuilder, ElementBuilder);

_.extend(CheckBoxBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initValueProperty(params, true);
        this.initForeground(params);
        this.initTextStyle(params);
        this.initHorizontalTextAlignmentProperty(params);
    },

    createElement: function (params) {
        return new CheckBox(params.parent);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
    }

},
    builderValuePropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderForegroundMixin,
    builderTextStyleMixin
);
