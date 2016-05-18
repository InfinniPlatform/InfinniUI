/**
 * @constructor
 * @augments ContainerBuilder
 */
function RowBuilder() {
    _.superClass(RowBuilder, this);
}

_.inherit(RowBuilder, ContainerBuilder);

_.extend(RowBuilder.prototype,
    /** @lends RowBuilder.prototype*/
    {
        createElement: function (params) {
            return new Row(params.parent);
        },

        /**
         * @param {Object} params
         * @param {RowBuilder} params.element
         * @param {Object} params.metadata
         */
        applyMetadata: function (params) {
            var
                metadata = params.metadata,
                element = params.element;

            ContainerBuilder.prototype.applyMetadata.call(this, params);
        }

    });