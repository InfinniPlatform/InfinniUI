/**
 *
 * @param {Object} params
 * @constructor
 */
function ButtonContentTemplateBuilder (params) {
    this.params = params;
}

ButtonContentTemplateBuilder.prototype.build = function () {
    var
        params = this.params,
        metadata = params.metadata;

    return metadata.Content ? this.buildContentTemplate() : this.buildTextTemplate();
};

ButtonContentTemplateBuilder.prototype.buildContentTemplate = function () {
    var
        params = this.params,
        builder = params.builder,
        metadata = params.metadata;

    return function (context, args) {
        return builder.build(metadata.Content, params);
    }
};

ButtonContentTemplateBuilder.prototype.buildTextTemplate = function () {
    var
        params = this.params,
        element = params.element;
    return function (context, args) {
        return {
            render: element.getText.bind(element)
        };
    }
};