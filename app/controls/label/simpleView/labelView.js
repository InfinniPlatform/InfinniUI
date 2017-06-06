/**
 * @constructor
 * @augments ControlView
 */
var SimpleLabelView = CommonLabelView.extend( {

    tagName: 'span',

    template: function() {
        return '';
    },

    /**
     * @mixes editorBaseViewMixin
     */
    UI: _.extend( {}, editorBaseViewMixin.UI, {
    } ),

    /**
     *
     */
    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        if ( focusable ) {
            this.$el.attr( 'tabindex', 0 );
        } else {
            this.$el.removeAttr( 'tabindex' );
        }
    },

    /**
     *
     * @returns {*}
     */
    getLabelElement: function() {
        return this.$el;
    }

} );

InfinniUI.ObjectUtils.setPropertyValueDirect( InfinniUI, 'viewModes.Label.simple', SimpleLabelView );
