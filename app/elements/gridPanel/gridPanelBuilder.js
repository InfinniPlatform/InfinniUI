/**
 * @constructor
 * @augments ContainerBuilder
 */
function GridPanelBuilder() {
    _.superClass(GridPanelBuilder, this);
}

window.InfinniUI.GridPanelBuilder = GridPanelBuilder;

_.inherit(GridPanelBuilder, ContainerBuilder);

_.extend(GridPanelBuilder.prototype,
    /** @lends GridPanelBuilder.prototype*/
    {
        createElement: function (params) {
            return new GridPanel(params.parent);
        },

        /**
         * @param {Object} params
         * @param {TablePanel} params.element
         * @param {Object} params.metadata
         */
        applyMetadata: function (params) {
            var
                metadata = params.metadata,
                element = params.element;

            ContainerBuilder.prototype.applyMetadata.call(this, params);
        }

    });
