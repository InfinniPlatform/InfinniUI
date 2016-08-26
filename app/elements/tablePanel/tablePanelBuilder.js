/**
 * @constructor
 * @augments ContainerBuilder
 */
function TablePanelBuilder() {
    _.superClass(TablePanelBuilder, this);
}

window.InfinniUI.TablePanelBuilder = TablePanelBuilder;

_.inherit(TablePanelBuilder, ContainerBuilder);

_.extend(TablePanelBuilder.prototype,
    /** @lends TablePanelBuilder.prototype*/
    {
        createElement: function (params) {
            return new TablePanel(params.parent);
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
