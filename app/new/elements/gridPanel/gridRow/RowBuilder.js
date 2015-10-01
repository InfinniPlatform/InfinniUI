/**
 * @constructor
 * @augments ContainerBuilder
 */
function GridRowBuilder() {
    _.superClass(GridRowBuilder, this);
}

_.inherit(GridRowBuilder, ContainerBuilder);

_.extend(GridRowBuilder.prototype,
    /** @lends GridRowBuilder.prototype*/
    {
        createElement: function (params) {
            return new GridRow(params.parent);
        },

        /**
         * @param {Object} params
         * @param {GridRowBuilder} params.element
         * @param {Object} params.metadata
         */
        applyMetadata: function (params) {
            var
                metadata = params.metadata,
                element = params.element;

            ContainerBuilder.prototype.applyMetadata.call(this, params);
        }

    });
