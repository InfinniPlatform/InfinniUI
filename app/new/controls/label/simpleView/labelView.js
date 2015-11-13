/**
 * @class SimpleLabelView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var SimpleLabelView = CommonLabelView.extend({
    tagName: 'span',

    template: function(){return '';},
    UI: _.extend({}, editorBaseViewMixin.UI, {

    }),

    getLabelElement: function(){
        return this.$el;
    }

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Label.viewModes.simple', SimpleLabelView);