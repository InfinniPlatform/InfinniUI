/**
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 */
function PasswordBoxBuilder() {
    _.superClass(PasswordBoxBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(PasswordBoxBuilder, ElementBuilder);

_.extend(PasswordBoxBuilder.prototype, /** @lends PasswordBoxBuilder.prototype */ {

        applyMetadata: function (params) {
            ElementBuilder.prototype.applyMetadata.call(this, params);
            this.applyMetadata_editorBaseBuilder(params);

            var metadata = params.metadata,
                element = params.element;

            element.setLabelText(metadata.LabelText);
            element.setLabelFloating(metadata.LabelFloating);
            element.setPasswordChar(metadata.PasswordChar);
        },

        createElement: function (params) {
            var element = new PasswordBox(params.parent);
            return element;
        }

    },
    editorBaseBuilderMixin
);