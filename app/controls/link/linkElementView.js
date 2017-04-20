/**
 * @class LinkElementView
 * @augments CommonButtonView
 */
var LinkElementView = CommonButtonView.extend( {

    tagName: 'a',

    className: 'pl-link',

    events: {
        'click': 'onClickHandler'
    },

    template: function() {return '';},

    updateProperties: function() {
        CommonButtonView.prototype.updateProperties.call( this );

        this.updateHref();
        this.updateTarget();
    },

    getButtonElement: function() {
        return this.$el;
    },

    initHandlersForProperties: function() {
        CommonButtonView.prototype.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:href', this.updateHref );
        this.listenTo( this.model, 'change:target', this.updateTarget );
    },

    updateHref: function() {
        var newHref = this.model.get( 'href' ),
            $link = this.getButtonElement();

        $link.attr( 'href', newHref );
    },

    updateTarget: function() {
        var newTarget = this.model.get( 'target' ),
            $link = this.getButtonElement();

        $link.attr( 'target', '_' + newTarget );
    },

    onClickHandler: function( e ) {
        var href = this.model.get( 'href' );
        if( href.indexOf( 'http://' ) === -1 ) {
            InfinniUI.AppRouter.navigate( href, { trigger: true } );
            if( e.which !== 2 ) {
                e.preventDefault();
            }
        }
    }

} );
