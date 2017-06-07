/**
 * @augments ElementBuilder
 * @constructor
 * @mixes buttonBuilderMixin
 */
function ButtonBuilder() {
    _.superClass( ButtonBuilder, this );
}

InfinniUI.ButtonBuilder = ButtonBuilder;

_.inherit( ButtonBuilder, ElementBuilder );

_.extend( ButtonBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {Button}
     */
    createElement: function( params ) {
        var viewMode = this.detectViewMode( params );

        return new Button( params.parent, viewMode );
    },

    /**
     *
     * @param params
     */
    detectViewMode: function( params ) {
        var viewMode = params.metadata[ 'ViewMode' ];
        var el = params.parent;
        var exit = false;

        if( !viewMode ) {
            while( !exit ) {
                if( el ) {
                    if( el instanceof PopupButton ) {
                        viewMode = 'link';
                        exit = true;

                    } else if( el instanceof MenuBar ) {
                        viewMode = 'menuItem';
                        exit = true;

                    } else if( el instanceof View ) {
                        exit = true;

                    } else {
                        el = el.parent;

                    }
                } else {
                    exit = true;
                }
            }
        }

        return viewMode;
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );

        this.applyButtonMetadata( params );

        if( params.metadata.Type ) {
            params.element.setType( params.metadata.Type );
        }
    }

}, buttonBuilderMixin );
