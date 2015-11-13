/**
 * @constructor
 * @augments ContainerBuilder
 */
function MenuBarBuilder() {
    _.superClass(MenuBarBuilder, this);
}

_.inherit(MenuBarBuilder, ContainerBuilder);

_.extend(MenuBarBuilder.prototype,
    /** @lends MenuBarBuilder.prototype*/
    {
        createElement: function (params) {
            return new MenuBar(params.parent);
        }

    });
