/**
 * @class FrameView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var FrameView = ControlView.extend( _.extend( {}, editorBaseViewMixin, {

    className: 'pl-frame',

    template: InfinniUI.Template[ 'controls/frame/template/frame.tpl.html' ],

    UI: _.extend( {}, editorBaseViewMixin.UI, {
        iframe: 'iframe'
    } ),

    initialize: function() {
        ControlView.prototype.initialize.apply( this );
    },

    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        editorBaseViewMixin.initHandlersForProperties.call( this );
    },

    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        editorBaseViewMixin.updateProperties.call( this );
    },

    updateValue: function() {
        var value = this.model.get( 'value' );

        this.ui.iframe.attr( 'src', value );
    },

    getData: function() {
        return _.extend(
            {},
            ControlView.prototype.getData.call( this ),
            editorBaseViewMixin.getData.call( this ),
            {

            }
        );
    },

    render: function() {
        var model = this.model;

        this.prerenderingActions();
        this.renderTemplate( this.template );

        this.updateProperties();

        this.trigger( 'render' );
        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    }

} ) );

InfinniUI.FrameView = FrameView;
