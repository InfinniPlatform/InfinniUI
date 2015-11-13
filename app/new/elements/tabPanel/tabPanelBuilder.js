/**
 * @constructor
 * @augments ContainerBuilder
 */
function TabPanelBuilder() {
    _.superClass(TabPanelBuilder, this);
}

_.inherit(TabPanelBuilder, ContainerBuilder);

_.extend(TabPanelBuilder.prototype, /** @lends TabPanelBuilder.prototype*/ {

    createElement: function (params) {
        return new TabPanel(params.parent);
    },

    /**
     * @param {Object} params
     * @param {Panel} params.element
     * @param {Object} params.metadata
     */
    applyMetadata: function (params) {
        var
            metadata = params.metadata,
            element = params.element;

        var data = ContainerBuilder.prototype.applyMetadata.call(this, params);

        element.setHeaderLocation(metadata.HeaderLocation);
        element.setHeaderOrientation(metadata.HeaderOrientation);

        return data;
    }

});
