/**
 * @constructor
 * @augments ContainerBuilder
 */
function ScrollPanelBuilder() {
    _.superClass(ScrollPanelBuilder, this);
}

_.inherit(ScrollPanelBuilder, ContainerBuilder);

_.extend(ScrollPanelBuilder.prototype, /** @lends ScrollPanelBuilder.prototype*/ {

    createElement: function (params) {
        return new ScrollPanel(params.parent);
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

        element.setHorizontalScroll(metadata.HorizontalScroll);
        element.setVerticalScroll(metadata.VerticalScroll);

        return data;
    }

});
