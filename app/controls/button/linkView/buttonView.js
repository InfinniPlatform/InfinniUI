/**
 *
 * @augments ControlView
 * @constructor
 */
var LinkButtonView = CommonButtonView.extend( {

    tagName: 'a',

    className: 'pl-button',

    attributes: {
        href: 'javascript:;'
    },

    events: {
        'click': 'onClickHandler'
    },

    /**
     *
     * @returns {string}
     */
    template: function() {return '';},

    UI: {
    },

    /**
     *
     * @returns {jQuery}
     */
    getButtonElement: function() {
        return this.$el;
    }

} );

InfinniUI.ObjectUtils.setPropertyValueDirect( InfinniUI, 'viewModes.Button.link', LinkButtonView );
