/**
 * @class SimpleLabelView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var SimpleLabelView = CommonLabelView.extend({
    tagName: 'span',

    template: function(){return '';},
    UI: _.extend({}, editorBaseViewMixin.UI, {

    })

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Label.viewModes.simple', SimpleLabelView);