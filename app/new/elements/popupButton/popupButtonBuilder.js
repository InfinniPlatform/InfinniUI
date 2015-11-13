/**
 * @constructor
 * @augments ContainerBuilder
 */
function PopupButtonBuilder() {
    _.superClass(PopupButtonBuilder, this);
}

_.inherit(PopupButtonBuilder, ContainerBuilder);

_.extend(PopupButtonBuilder.prototype, /** @lends PopupButtonBuilder.prototype */{

    createElement: function (params) {
        return new PopupButton(params.parent);
    },

    applyMetadata: function (params) {
        ContainerBuilder.prototype.applyMetadata.call(this, params);
        this.applyButtonMetadata.call(this, params);
    }

}, buttonBuilderMixin);