/**
 * @constructor
 * @augments ContainerBuilder
 */
function StackPanelBuilder() {
    _.superClass(StackPanelBuilder, this);
}

window.InfinniUI.StackPanelBuilder = StackPanelBuilder;

_.inherit(StackPanelBuilder, ContainerBuilder);

_.extend(StackPanelBuilder.prototype,
    /** @lends StackPanelBuilder.prototype*/
    {
        createElement: function (params) {
            return new StackPanel(params.parent, params.metadata['ViewMode']);
        },

        /**
         * @param {Object} params
         * @param {StackPanel} params.element
         * @param {Object} params.metadata
         */
        applyMetadata: function (params) {
            var
                metadata = params.metadata,
                element = params.element;

            var result = ContainerBuilder.prototype.applyMetadata.call(this, params);
            element.setOrientation(metadata.Orientation);

            return result;
        }

    });
