/**
 *
 * @constructor
 * @augments ContainerBuilder
 */
function ToolBarBuilder() {
    _.superClass(ToolBarBuilder, this);
}

_.inherit(ToolBarBuilder, ContainerBuilder);

_.extend(ToolBarBuilder.prototype, /** @lends ToolBarBuilder.prototype */{

    createElement: function (params) {
        return new ToolBar(params.parent);
    }

});