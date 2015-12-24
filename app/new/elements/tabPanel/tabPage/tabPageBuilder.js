/**
 * @constructor
 * @augments ContainerBuilder
 */
function TabPageBuilder() {
    _.superClass(TabPageBuilder, this);
}

_.inherit(TabPageBuilder, ContainerBuilder);

_.extend(TabPageBuilder.prototype, /** @lends TabPageBuilder.prototype*/ {

    createElement: function (params) {
        return new TabPage(params.parent);
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

        element.setIcon(metadata.Icon);
        element.setCanClose(metadata.CanClose);

        this.initScriptHandlers(params);

        return data;
    },

    /**
     * @protected
     * @param params
     */
    initScriptHandlers: function (params) {
        var
            metadata = params.metadata,
            element = params.element;

        if (metadata.OnClosing) {
            element.onClosing(function () {
                return new ScriptExecutor(params.parentView).executeScript(metadata.OnClosing.Name || metadata.OnClosing, {});
            });
        }

        if (metadata.OnClosed) {
            element.onClosed(function () {
                return new ScriptExecutor(params.parentView).executeScript(metadata.OnClosed.Name || metadata.OnClosed, {});
            });
        }
    }



});
